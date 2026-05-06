import { createContext, useState, useContext } from 'react';

const PricingWizardContext = createContext();

export function PricingWizardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PricingWizardContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PricingWizardContext.Provider>
  );
}

export function usePricingWizard() {
  const context = useContext(PricingWizardContext);
  if (!context) {
    throw new Error('usePricingWizard must be used within PricingWizardProvider');
  }
  return context;
}
