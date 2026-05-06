import { usePricingWizard } from './PricingWizardContext';
import Modal from '../ui/Modal';
import PricingWizard from './PricingWizard';

export function PricingWizardModal() {
  const { isOpen, setIsOpen } = usePricingWizard();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Price Plan Predictor"
      size="lg"
      showHeader={true}
      showCloseButton={true}
      bodyClassName="p-0"
    >
      <PricingWizard />
    </Modal>
  );
}
