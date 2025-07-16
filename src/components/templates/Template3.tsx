import { ProductData } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight, Timer, Shield, Users } from 'lucide-react';
import productPlaceholder from '@/assets/product-placeholder.jpg';

interface Template3Props {
  productData: ProductData;
  showActions?: boolean;
  onSelect?: () => void;
}

const Template3: React.FC<Template3Props> = ({ productData, showActions = false, onSelect }) => {
  const handleCtaClick = () => {
    if (productData.checkoutLink) {
      window.open(productData.checkoutLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Land Facil Dionisio</h1>
            {showActions && (
              <Button onClick={onSelect} className="bg-primary hover:bg-primary/90">
                Escolher este Template
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Side by Side */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-destructive text-destructive-foreground">
              <Timer className="h-4 w-4 mr-2" />
              Tempo Limitado
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              {productData.productName}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {productData.productDescription}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Resultados comprovados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Mais de 1000 clientes satisfeitos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Garantia de 30 dias</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-3xl font-bold text-primary">
                {productData.productPrice}
              </div>
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-2 text-muted-foreground">(4.8/5)</span>
              </div>
            </div>

            <Button 
              onClick={handleCtaClick}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group"
            >
              Comprar Agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg"></div>
            <img 
              src={productData.productImage || productPlaceholder} 
              alt={productData.productName}
              className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-muted-foreground">Avaliação Média</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">30 dias</div>
              <p className="text-muted-foreground">Garantia Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits as Timeline */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            O que você vai conseguir:
          </h3>
          <div className="max-w-3xl mx-auto">
            {productData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials with Photos */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Histórias de Sucesso
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {productData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-3">"{testimonial}"</p>
                      <p className="text-sm font-medium">Cliente verificado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-accent/20 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Shield className="h-16 w-16 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Garantia Incondicional de 30 Dias
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {productData.guarantee}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-accent mb-2">30</div>
                  <p className="text-muted-foreground">Dias para testar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scarcity */}
      <div className="bg-destructive/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive font-semibold text-lg">
            ⚠️ {productData.scarcity}
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-primary-foreground">
            Transforme sua vida hoje mesmo!
          </h3>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Junte-se a mais de 1000 pessoas que já alcançaram seus objetivos
          </p>
          <Button 
            onClick={handleCtaClick}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 group"
          >
            Comprar Agora - {productData.productPrice}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Template3;