import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, Target, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: '',
    checkoutLink: '',
    benefits: ['', '', ''],
    testimonials: ['', ''],
    guarantee: '',
    scarcity: '',
    bonuses: ['', '']
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.productName || !formData.productDescription || !formData.productPrice) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, descrição e preço do produto.",
        variant: "destructive"
      });
      return;
    }

    // Filtrar campos vazios dos arrays
    const processedData = {
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      testimonials: formData.testimonials.filter(testimonial => testimonial.trim() !== ''),
      bonuses: formData.bonuses.filter(bonus => bonus.trim() !== '')
    };

    // Salvar no contexto
    dispatch({ type: 'SET_PRODUCT_DATA', payload: processedData });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'preview' });
    
    toast({
      title: "Dados salvos!",
      description: "Gerando suas páginas mágicas...",
    });
    
    // Navegar para preview
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Land Facil Dionisio
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Crie landing pages de alta conversão em minutos
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <img 
              src={heroImage} 
              alt="Land Facil Dionisio Platform" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Transforme suas ideias em páginas que vendem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa IA gera 3 templates profissionais personalizados para o seu produto. 
            Basta preencher os dados e deixar a mágica acontecer!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Geração Instantânea</h3>
              <p className="text-muted-foreground">
                3 templates profissionais gerados em segundos
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alta Conversão</h3>
              <p className="text-muted-foreground">
                Páginas otimizadas para maximizar suas vendas
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pronto para Usar</h3>
              <p className="text-muted-foreground">
                Publique e compartilhe instantaneamente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              Dados do Seu Produto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações básicas */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="productName" className="text-base font-semibold">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Ex: Curso de Marketing Digital"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="productPrice" className="text-base font-semibold">
                    Preço *
                  </Label>
                  <Input
                    id="productPrice"
                    value={formData.productPrice}
                    onChange={(e) => handleInputChange('productPrice', e.target.value)}
                    placeholder="Ex: R$ 97,00"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="productDescription" className="text-base font-semibold">
                  Descrição do Produto *
                </Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Descreva os principais benefícios e características do seu produto..."
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="productImage" className="text-base font-semibold">
                    URL da Imagem do Produto
                  </Label>
                  <Input
                    id="productImage"
                    value={formData.productImage}
                    onChange={(e) => handleInputChange('productImage', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="checkoutLink" className="text-base font-semibold">
                    Link de Checkout
                  </Label>
                  <Input
                    id="checkoutLink"
                    value={formData.checkoutLink}
                    onChange={(e) => handleInputChange('checkoutLink', e.target.value)}
                    placeholder="https://checkout.exemplo.com"
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Benefícios */}
              <div>
                <Label className="text-base font-semibold">
                  Principais Benefícios
                </Label>
                <div className="space-y-2 mt-2">
                  {formData.benefits.map((benefit, index) => (
                    <Input
                      key={index}
                      value={benefit}
                      onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                      placeholder={`Benefício ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Depoimentos */}
              <div>
                <Label className="text-base font-semibold">
                  Depoimentos de Clientes
                </Label>
                <div className="space-y-2 mt-2">
                  {formData.testimonials.map((testimonial, index) => (
                    <Textarea
                      key={index}
                      value={testimonial}
                      onChange={(e) => handleArrayChange('testimonials', index, e.target.value)}
                      placeholder={`Depoimento ${index + 1}`}
                      className="min-h-[80px]"
                    />
                  ))}
                </div>
              </div>

              {/* Garantia */}
              <div>
                <Label htmlFor="guarantee" className="text-base font-semibold">
                  Garantia
                </Label>
                <Textarea
                  id="guarantee"
                  value={formData.guarantee}
                  onChange={(e) => handleInputChange('guarantee', e.target.value)}
                  placeholder="Ex: Garantia incondicional de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
                  className="mt-2 min-h-[80px]"
                />
              </div>

              {/* Escassez */}
              <div>
                <Label htmlFor="scarcity" className="text-base font-semibold">
                  Escassez/Urgência
                </Label>
                <Input
                  id="scarcity"
                  value={formData.scarcity}
                  onChange={(e) => handleInputChange('scarcity', e.target.value)}
                  placeholder="Ex: Últimas 48 horas para garantir o preço promocional!"
                  className="mt-2"
                />
              </div>

              {/* Bônus */}
              <div>
                <Label className="text-base font-semibold">
                  Bônus Exclusivos
                </Label>
                <div className="space-y-2 mt-2">
                  {formData.bonuses.map((bonus, index) => (
                    <Input
                      key={index}
                      value={bonus}
                      onChange={(e) => handleArrayChange('bonuses', index, e.target.value)}
                      placeholder={`Bônus ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Gerar Minha Página Mágica
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;