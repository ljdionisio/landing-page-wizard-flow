import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import { ArrowLeft, Share2, Copy, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Published = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Verificar se há dados do produto e template selecionado
    if (!state.productData.productName || !state.selectedTemplate) {
      toast({
        title: "Dados não encontrados",
        description: "Por favor, complete o fluxo de criação da página.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'published' });
  }, [state.productData, state.selectedTemplate, navigate, dispatch, toast]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(state.publishedUrl || window.location.href);
      setCopySuccess(true);
      toast({
        title: "Link copiado!",
        description: "URL da página copiada para a área de transferência.",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: state.productData.productName,
      text: state.productData.productDescription,
      url: state.publishedUrl || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await handleCopyUrl();
      }
    } catch (err) {
      console.log('Erro ao compartilhar:', err);
    }
  };

  const handleGoBack = () => {
    navigate('/preview');
  };

  const handleCreateNew = () => {
    dispatch({ type: 'RESET_STATE' });
    navigate('/');
  };

  const renderSelectedTemplate = () => {
    switch (state.selectedTemplate) {
      case 'template1':
        return <Template1 productData={state.productData} />;
      case 'template2':
        return <Template2 productData={state.productData} />;
      case 'template3':
        return <Template3 productData={state.productData} />;
      default:
        return null;
    }
  };

  if (!state.productData.productName || !state.selectedTemplate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header de Controle */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={handleGoBack}
                className="text-primary-foreground hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Página Publicada</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={handleShare}
                className="text-primary-foreground hover:bg-white/20"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCopyUrl}
                className="text-primary-foreground hover:bg-white/20"
              >
                {copySuccess ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copySuccess ? 'Copiado!' : 'Copiar Link'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Sucesso */}
      <div className="bg-accent/10 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                🎉 Parabéns! Sua página está no ar!
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Sua landing page "{state.productData.productName}" foi publicada com sucesso.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {state.publishedUrl || window.location.href}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleCopyUrl}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Link da Página
                </Button>
                <Button 
                  onClick={handleShare}
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button 
                  onClick={handleCreateNew}
                  size="lg"
                  className="bg-accent hover:bg-accent/90"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Criar Nova Página
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Página Publicada */}
      <div className="border-t-8 border-accent/20">
        {renderSelectedTemplate()}
      </div>
    </div>
  );
};

export default Published;