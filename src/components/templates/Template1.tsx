import { ProductData } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Shield, Clock } from 'lucide-react';
import productPlaceholder from '@/assets/product-placeholder.jpg';

interface Template1Props {
  productData: ProductData;
  showActions?: boolean;
  onSelect?: () => void;
}

const Template1: React.FC<Template1Props> = ({ productData, showActions = false, onSelect }) => {
  const handleCtaClick = () => {
    if (productData.checkoutLink) {
      window.open(productData.checkoutLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Land Facil Dionisio</h1>
            {showActions && (
              <Button onClick={onSelect} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Escolher este Template
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-accent text-accent-foreground">
              ⚡ Oferta Limitada
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {productData.productName}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {productData.productDescription}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-3xl font-bold text-primary">
                {productData.productPrice}
              </div>
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <Button 
              onClick={handleCtaClick}
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
            >
              Comprar Agora
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30"></div>
            <img 
              src={productData.productImage || productPlaceholder} 
              alt={productData.productName}
              className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Benefícios Exclusivos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {productData.benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="text-lg font-semibold">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Depoimentos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {productData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-primary">Garantia Total</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {productData.guarantee}
          </p>
        </div>
      </div>

      {/* Scarcity */}
      <div className="bg-destructive/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-destructive" />
            <span className="text-destructive font-semibold">Atenção!</span>
          </div>
          <p className="text-destructive">{productData.scarcity}</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-primary-foreground">
            Não Perca Esta Oportunidade!
          </h3>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Transforme sua vida agora mesmo
          </p>
          <Button 
            onClick={handleCtaClick}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
          >
            Comprar Agora - {productData.productPrice}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Template1;