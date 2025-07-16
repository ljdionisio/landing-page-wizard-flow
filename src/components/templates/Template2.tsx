import { ProductData } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Gift, Zap, Shield } from 'lucide-react';
import productPlaceholder from '@/assets/product-placeholder.jpg';

interface Template2Props {
  productData: ProductData;
  showActions?: boolean;
  onSelect?: () => void;
}

const Template2: React.FC<Template2Props> = ({ productData, showActions = false, onSelect }) => {
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
              <Button onClick={onSelect} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Escolher este Template
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Centered */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent text-accent-foreground text-lg px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Oferta Especial
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            {productData.productName}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {productData.productDescription}
          </p>
          
          <div className="mb-8">
            <img 
              src={productData.productImage || productPlaceholder} 
              alt={productData.productName}
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-4xl font-bold text-primary">
              {productData.productPrice}
            </div>
            <div className="flex items-center gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
              <span className="ml-2 text-muted-foreground">(4.9/5)</span>
            </div>
          </div>

          <Button 
            onClick={handleCtaClick}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-xl px-12 py-6 mb-4"
          >
            Comprar Agora
          </Button>
          
          <p className="text-sm text-muted-foreground">
            ✅ Pagamento 100% Seguro | ✅ Garantia de 30 dias
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            O que você vai receber:
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bonuses */}
      {productData.bonuses.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary">
              Bônus Exclusivos
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {productData.bonuses.map((bonus, index) => (
                <Card key={index} className="border-accent/20 shadow-lg">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Gift className="h-8 w-8 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Bônus #{index + 1}</h4>
                      <p className="text-muted-foreground">{bonus}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Veja o que nossos clientes dizem:
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {productData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{testimonial}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">Cliente verificado</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-3xl mx-auto border-accent/20 shadow-lg">
            <CardContent className="p-8">
              <Shield className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Garantia Incondicional
              </h3>
              <p className="text-lg text-muted-foreground">
                {productData.guarantee}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scarcity Bar */}
      <div className="bg-destructive text-destructive-foreground py-4 sticky bottom-0 z-50">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold">
            ⚠️ {productData.scarcity}
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Garanta já o seu {productData.productName}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Aproveite esta oportunidade única!
          </p>
          <Button 
            onClick={handleCtaClick}
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xl px-12 py-6"
          >
            Comprar Agora - {productData.productPrice}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Template2;