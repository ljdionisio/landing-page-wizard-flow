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

// Função para carregar estado do localStorage
const loadFromStorage = (): AppState => {
  try {
    const savedState = localStorage.getItem('landFacilState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Erro ao carregar estado do localStorage:', error);
  }
  
  return {
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
};

// Função para salvar estado no localStorage
const saveToStorage = (state: AppState) => {
  try {
    localStorage.setItem('landFacilState', JSON.stringify(state));
  } catch (error) {
    console.error('Erro ao salvar estado no localStorage:', error);
  }
};

const initialState: AppState = loadFromStorage();

const appReducer = (state: AppState, action: AppAction): AppState => {
  let newState: AppState;
  
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      newState = { ...state, productData: action.payload };
      break;
    case 'SET_SELECTED_TEMPLATE':
      newState = { ...state, selectedTemplate: action.payload };
      break;
    case 'SET_PUBLISHED_URL':
      newState = { ...state, publishedUrl: action.payload };
      break;
    case 'SET_CURRENT_STEP':
      newState = { ...state, currentStep: action.payload };
      break;
    case 'RESET_STATE':
      newState = loadFromStorage();
      localStorage.removeItem('landFacilState');
      return newState;
    default:
      newState = state;
  }
  
  // Salvar no localStorage sempre que houver mudanças
  if (newState !== state) {
    saveToStorage(newState);
  }
  
  return newState;
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