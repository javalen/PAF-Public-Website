import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitPricingLead } from '../api/pricingLead';
import './Pricing.css';

const priorities = ['Work orders', 'Preventive maintenance', 'Asset tracking', 'Inspections & compliance', 'Vendor management', 'Reserve studies & capital planning', 'Portfolio reporting'];
const teamSizes = ['1–10','11–25','26–50','51+'];
const initial = {interests:[],team_size:'',first_name:'',last_name:'',email:'',phone:'',company_name:'',company_size:'',region:'',role:'',notes:''};
export function Pricing() {
  const [step,setStep] = useState(0);
  const [values,setValues] = useState(initial);
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [result,setResult] = useState(null);
  const heading = useRef(null);
  const submitting = useRef(false);
  function update(event) {setValues(previous=>({...previous,[event.target.name]:event.target.value}));setError('');}
  function move(next) {setError('');setStep(next);requestAnimationFrame(()=>heading.current?.focus());}
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (step === 0) {if (!values.interests.length) {setError('Select at least one area you would like to improve.');return;} move(1);return;}
    if (step === 1) {if (!values.team_size) {setError('Select your maintenance team size.');return;} move(2);return;}
    if (!values.first_name.trim() || !values.last_name.trim() || !values.company_name.trim()) {setError('Enter your name and company name.');return;}
    submitting.current = true;setBusy(true);setError('');
    try {setResult(await submitPricingLead(values));requestAnimationFrame(()=>heading.current?.focus());}
    catch(err) {setError(err.name === 'TimeoutError' ? 'We could not confirm receipt in time. Please contact support before resubmitting.' : err.message);}
    finally {submitting.current=false;setBusy(false);}
  }
  return <section id="pricing" className="pricing-request reserve-section" aria-labelledby="pricing-title">
    <div className="reserve-container pricing-request-layout">
      <div className="pricing-request-intro"><span className="reserve-kicker">Pricing built around your team</span><h2 id="pricing-title">Find the right fit for your property.</h2><p>Tell us what you want to improve and how your team works. We will follow up with pricing tailored to your needs.</p><ul>{['Share your maintenance priorities','Tell us about your team','Get a conversation about the right plan'].map(text=><li key={text}><CheckCircle2 aria-hidden="true" />{text}</li>)}</ul><p className="pricing-request-note">No instant estimate or payment required. Your request goes to the Predictaf team.</p></div>
      <div className="pricing-request-card">
        {result ? <div className="pricing-request-success" role="status"><CheckCircle2 aria-hidden="true" /><h3 ref={heading} tabIndex={-1}>Your pricing request is received.</h3><p>We have saved your details. The Predictaf team will follow up at <strong>{values.email}</strong>.</p><p>Reference: {result.id}</p><a href="/resources">Explore maintenance resources <ArrowRight aria-hidden="true" /></a></div> : <form onSubmit={submit}>
          <p className="pricing-request-step">Step {step+1} of 3 · {['Your priorities','Your team','Contact details'][step]}</p>
          <progress max="3" value={step+1} aria-label="Request progress" />
          <h3 ref={heading} tabIndex={-1}>{['What would you like to improve?','How many maintenance team members do you have?','Where should we follow up?'][step]}</h3>
          {step===0 && <fieldset><legend>Select all that apply</legend><div className="pricing-request-options">{priorities.map(priority=><label key={priority}><input type="checkbox" name="interests" value={priority} checked={values.interests.includes(priority)} onChange={event=>{setValues(previous=>({...previous,interests:event.target.checked?[...previous.interests,priority]:previous.interests.filter(item=>item!==priority)}));setError('');}} /><span>{priority}</span></label>)}</div></fieldset>}
          {step===1 && <fieldset><legend>Choose your team size</legend><div className="pricing-request-options">{teamSizes.map(size=><label key={size}><input required type="radio" name="team_size" value={size} checked={values.team_size===size} onChange={update} /><span>{size} people</span></label>)}</div></fieldset>}
          {step===2 && <><div className="pricing-request-summary"><strong>Your request</strong><p>{values.interests.join(', ')} · {values.team_size} maintenance team members</p></div><div className="pricing-request-fields">
            <label>First name *<input required name="first_name" autoComplete="given-name" maxLength={80} value={values.first_name} onChange={update}/></label>
            <label>Last name *<input required name="last_name" autoComplete="family-name" maxLength={80} value={values.last_name} onChange={update}/></label>
            <label>Business email *<input required type="email" name="email" autoComplete="email" maxLength={254} value={values.email} onChange={update}/></label>
            <label>Phone number *<input required type="tel" name="phone" autoComplete="tel" minLength={7} maxLength={40} value={values.phone} onChange={update}/></label>
            <label>Company or association *<input required name="company_name" autoComplete="organization" maxLength={120} value={values.company_name} onChange={update}/></label>
            <label>Company size *<select required name="company_size" value={values.company_size} onChange={update}><option value="">Select size</option>{['1–10','11–50','51–200','201–500','501+'].map(size=><option key={size}>{size}</option>)}</select></label>
            <label>Your role *<select required name="role" value={values.role} onChange={update}><option value="">Select role</option><option value="property_manager">Property / facility manager</option><option value="hoa_board">HOA / association board</option><option value="owner">Owner / asset manager</option><option value="other">Other</option></select></label>
            <label>Country / region *<input required name="region" autoComplete="country-name" maxLength={100} value={values.region} onChange={update}/></label>
            <label className="pricing-request-wide">Anything else we should know? (optional)<textarea name="notes" rows={3} maxLength={2000} value={values.notes} onChange={update}/></label>
          </div><p className="pricing-request-note">By submitting, you ask Predictaf to contact you about this pricing request. Read our <a href="/privacy">Privacy Policy</a>.</p></>}
          {error && <p className="pricing-request-error" role="alert">{error}</p>}
          <div className="pricing-request-actions">{step>0 && <button type="button" disabled={busy} onClick={()=>move(step-1)}>Previous</button>}<button className="pricing-request-primary" type="submit" disabled={busy}>{busy?'Sending…':step===2?'Request pricing':'Next'}{!busy&&<ArrowRight aria-hidden="true" />}</button></div>
        </form>}
      </div>
    </div>
  </section>;
}
