import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@shared/types';
import { Leaf, Users, Truck, Store, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('consumer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginAsGuest } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha email e senha.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password, role);
      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo ao FreshTec!`,
      });
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestLogin = (guestRole: UserRole) => {
    loginAsGuest(guestRole);
    toast({
      title: 'Entrando como convidado',
      description: `Visualizando interface de ${getRoleDisplayName(guestRole)}`,
    });
  };

  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case 'producer': return 'Produtor';
      case 'transporter': return 'Transportador';
      case 'retailer': return 'Varejista';
      case 'consumer': return 'Consumidor';
      default: return '';
    }
  };

  const roleOptions = [
    { value: 'producer', label: 'Produtor', icon: Leaf, description: 'Fazendas e produtores rurais' },
    { value: 'transporter', label: 'Transportador', icon: Truck, description: 'Empresas de logística' },
    { value: 'retailer', label: 'Varejista', icon: Store, description: 'Supermercados e lojas' },
    { value: 'consumer', label: 'Consumidor', icon: User, description: 'Consumidores finais' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">FreshTec</CardTitle>
          <p className="text-gray-600 mt-2">Passaporte do Frescor</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Tipo de Usuário</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <Label htmlFor={option.value} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-center text-gray-600 mb-3">Entrar como convidado:</p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleGuestLogin(option.value as UserRole)}
                      className="flex items-center justify-center space-x-2 h-12"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <button className="text-primary hover:underline">
                  Criar conta
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}