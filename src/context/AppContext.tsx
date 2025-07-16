import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  checkoutLink: string;
  benefits: string[];
  testimonials: string[];
  guarantee: string;
  scarcity: string;
  bonuses: string[];
}

export interface AppState {
  productData: ProductData;
  selectedTemplate: 'template1' | 'template2' | 'template3' | null;
  publishedUrl: string;
  currentStep: 'input' | 'preview' | 'published';
}

type AppAction = 
  | { type: 'SET_PRODUCT_DATA'; payload: ProductData }
  | { type: 'SET_SELECTED_TEMPLATE'; payload: 'template1' | 'template2' | 'template3' }
  | { type: 'SET_PUBLISHED_URL'; payload: string }
  | { type: 'SET_CURRENT_STEP'; payload: 'input' | 'preview' | 'published' }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  productData: {
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: '',
    checkoutLink: '',
    benefits: [],
    testimonials: [],
    guarantee: '',
    scarcity: '',
    bonuses: []
  },
  selectedTemplate: null,
  publishedUrl: '',
  currentStep: 'input'
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return { ...state, productData: action.payload };
    case 'SET_SELECTED_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_PUBLISHED_URL':
      return { ...state, publishedUrl: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};