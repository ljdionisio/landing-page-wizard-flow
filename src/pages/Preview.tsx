import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Preview = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se há dados do produto
    if (!state.productData.productName) {
      toast({
        title: "Dados não encontrados",
        description: "Por favor, preencha os dados do produto primeiro.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'preview' });
  }, [state.productData, navigate, dispatch, toast]);

  const handleSelectTemplate = (templateId: 'template1' | 'template2' | 'template3') => {
    dispatch({ type: 'SET_SELECTED_TEMPLATE', payload: templateId });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'published' });
    
    // Gerar URL única para a página publicada
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const publishedUrl = `${window.location.origin}/published/${uniqueId}`;
    dispatch({ type: 'SET_PUBLISHED_URL', payload: publishedUrl });
    
    toast({
      title: "Template selecionado!",
      description: "Redirecionando para sua página publicada...",
    });
    
    // Navegar para a página publicada
    navigate('/published');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (!state.productData.productName) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Land Facil Dionisio
              </h1>
              <p className="text-muted-foreground">Escolha seu template favorito</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Sparkles className="h-4 w-4 mr-2" />
            Páginas Geradas
          </Badge>
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Suas Landing Pages Estão Prontas!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o template que mais combina com o seu produto e publique instantaneamente.
          </p>
        </div>

        {/* Templates Preview */}
        <div className="space-y-12">
          {/* Template 1 */}
          <Card className="border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-center text-2xl text-primary">
                Template 1 - Elegante
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Design moderno com gradientes e hierarquia visual clara
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto border-b">
                <Template1 
                  productData={state.productData} 
                  showActions={true}
                  onSelect={() => handleSelectTemplate('template1')}
                />
              </div>
              <div className="p-6 text-center bg-muted/30">
                <Button 
                  onClick={() => handleSelectTemplate('template1')}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Escolher este e Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Template 2 */}
          <Card className="border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-center text-2xl text-primary">
                Template 2 - Centrado
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Layout centralizado com foco no produto e depoimentos
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto border-b">
                <Template2 
                  productData={state.productData} 
                  showActions={true}
                  onSelect={() => handleSelectTemplate('template2')}
                />
              </div>
              <div className="p-6 text-center bg-muted/30">
                <Button 
                  onClick={() => handleSelectTemplate('template2')}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Escolher este e Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Template 3 */}
          <Card className="border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-center text-2xl text-primary">
                Template 3 - Profissional
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Abordagem corporativa com estatísticas e prova social
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto border-b">
                <Template3 
                  productData={state.productData} 
                  showActions={true}
                  onSelect={() => handleSelectTemplate('template3')}
                />
              </div>
              <div className="p-6 text-center bg-muted/30">
                <Button 
                  onClick={() => handleSelectTemplate('template3')}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Escolher este e Publicar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preview;