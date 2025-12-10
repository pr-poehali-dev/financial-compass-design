import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  emoji: string;
}

interface Category {
  id: string;
  name: string;
  spent: number;
  limit: number;
  emoji: string;
  color: string;
}

interface Notification {
  id: string;
  type: 'warning' | 'success';
  message: string;
  emoji: string;
}

interface FamilyMember {
  name: string;
  avatar: string;
}

const Index = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const balance = 245780;
  
  const goals: Goal[] = [
    { id: '1', name: 'Отпуск в Грузии', current: 125000, target: 250000, emoji: '✈️' },
    { id: '2', name: 'Новый iPhone', current: 45000, target: 120000, emoji: '📱' },
  ];

  const categories: Category[] = [
    { id: '1', name: 'Продукты', spent: 18500, limit: 25000, emoji: '🛒', color: 'bg-emerald-500' },
    { id: '2', name: 'Развлечения', spent: 16000, limit: 20000, emoji: '🎮', color: 'bg-purple-500' },
    { id: '3', name: 'Дети', spent: 12000, limit: 15000, emoji: '👶', color: 'bg-pink-500' },
    { id: '4', name: 'Коммуналка', spent: 8500, limit: 10000, emoji: '🏠', color: 'bg-blue-500' },
    { id: '5', name: 'Транспорт', spent: 5200, limit: 8000, emoji: '🚗', color: 'bg-orange-500' },
  ];

  const notifications: Notification[] = [
    { id: '1', type: 'warning', message: 'Категория "Развлечения" заполнена на 80%', emoji: '⚠️' },
    { id: '2', type: 'success', message: 'Вы на полпути к цели "Отпуск"!', emoji: '🎉' },
  ];

  const familyMembers: FamilyMember[] = [
    { name: 'Мария', avatar: '👩' },
    { name: 'Алексей', avatar: '👨' },
  ];

  const quickCategories = [
    { id: '1', name: 'Продукты', emoji: '🛒' },
    { id: '2', name: 'Кафе', emoji: '☕' },
    { id: '3', name: 'Дети', emoji: '👶' },
    { id: '4', name: 'Коммуналка', emoji: '🏠' },
    { id: '5', name: 'Транспорт', emoji: '🚗' },
    { id: '6', name: 'Развлечения', emoji: '🎮' },
  ];

  const handleAddExpense = () => {
    if (expenseAmount && selectedCategory) {
      setIsAddExpenseOpen(false);
      setExpenseAmount('');
      setSelectedCategory('');
    }
  };

  const chartData = [
    { category: 'Продукты', value: 18500, color: 'bg-emerald-500' },
    { category: 'Развлечения', value: 16000, color: 'bg-purple-500' },
    { category: 'Дети', value: 12000, color: 'bg-pink-500' },
    { category: 'Коммуналка', value: 8500, color: 'bg-blue-500' },
    { category: 'Транспорт', value: 5200, color: 'bg-orange-500' },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 p-6 rounded-b-3xl mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Финансовый Компас</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Icon name="Bell" size={24} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-xs flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground mb-2">Общий баланс</div>
              <div className="number-display text-5xl mb-6">
                {balance.toLocaleString('ru-RU')} ₽
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-success hover:bg-success/90 text-white h-14 text-lg rounded-2xl"
                >
                  <Icon name="Plus" size={24} className="mr-2" />
                  Доход
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="flex-1 h-14 text-lg rounded-2xl"
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  <Icon name="Minus" size={24} className="mr-2" />
                  Расход
                </Button>
              </div>
            </div>

            <div className="px-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Финансовые цели</h2>
                  <Button variant="ghost" size="sm">
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <Card key={goal.id} className="p-4 hover:bg-card/80 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{goal.emoji}</span>
                          <span className="font-medium">{goal.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((goal.current / goal.target) * 100)}%
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-3 mb-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {goal.current.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="font-medium">
                          {goal.target.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Категории расходов</h2>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Card key={category.id} className="p-4 hover:bg-card/80 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-2xl`}>
                          {category.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-sm">
                              {category.spent.toLocaleString('ru-RU')} / {category.limit.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <Progress value={(category.spent / category.limit) * 100} className="h-2" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Семейный бюджет</h1>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab('dashboard')}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Участники</span>
                <Button variant="ghost" size="sm">
                  <Icon name="UserPlus" size={18} />
                </Button>
              </div>
              <div className="flex gap-3">
                {familyMembers.map((member, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                      {member.avatar}
                    </div>
                    <span className="text-xs text-muted-foreground">{member.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <h2 className="text-lg font-semibold mb-4">Общие категории</h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-2xl`}>
                        {category.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{category.name}</span>
                          <Button variant="ghost" size="sm">
                            <Icon name="History" size={16} />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Осталось: {(category.limit - category.spent).toLocaleString('ru-RU')} ₽
                        </div>
                        <Progress value={(category.spent / category.limit) * 100} className="h-2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Отчёты</h1>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab('dashboard')}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Траты за месяц</h3>
                <Badge variant="secondary">{total.toLocaleString('ru-RU')} ₽</Badge>
              </div>

              <div className="relative w-64 h-64 mx-auto mb-6">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  {chartData.map((item, idx) => {
                    const prevSum = chartData.slice(0, idx).reduce((sum, i) => sum + i.value, 0);
                    const startAngle = (prevSum / total) * 360;
                    const endAngle = ((prevSum + item.value) / total) * 360;
                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                    const startX = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                    const endY = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);

                    const colorMap: Record<string, string> = {
                      'bg-emerald-500': '#10b981',
                      'bg-purple-500': '#a855f7',
                      'bg-pink-500': '#ec4899',
                      'bg-blue-500': '#3b82f6',
                      'bg-orange-500': '#f97316',
                    };

                    return (
                      <path
                        key={idx}
                        d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={colorMap[item.color] || '#8b5cf6'}
                        opacity="0.9"
                        className="transition-opacity hover:opacity-100"
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="space-y-2">
                {chartData.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {item.value.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-2 mb-4">
              <Button variant="secondary" size="sm" className="flex-1">Неделя</Button>
              <Button variant="default" size="sm" className="flex-1">Месяц</Button>
              <Button variant="secondary" size="sm" className="flex-1">Год</Button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Уведомления</h1>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab('dashboard')}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`p-4 border-l-4 ${
                    notif.type === 'warning' ? 'border-l-destructive' : 'border-l-success'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{notif.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">Сегодня, 14:23</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Добавить расход</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="number"
                placeholder="Введите сумму"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="text-2xl h-14 text-center number-display"
                autoFocus
              />
              
              <div className="grid grid-cols-3 gap-3">
                {quickCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'secondary'}
                    className="h-20 flex flex-col gap-1"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-xs">{cat.name}</span>
                  </Button>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full h-12"
                onClick={handleAddExpense}
                disabled={!expenseAmount || !selectedCategory}
              >
                Готово
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-md mx-auto flex items-center justify-around py-3">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setActiveTab('dashboard')}
            >
              <Icon name="Home" size={22} />
              <span className="text-xs mt-1">Главная</span>
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setActiveTab('analytics')}
            >
              <Icon name="PieChart" size={22} />
              <span className="text-xs mt-1">Отчёты</span>
            </Button>
            <Button
              variant={activeTab === 'family' ? 'default' : 'ghost'}
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setActiveTab('family')}
            >
              <Icon name="Users" size={22} />
              <span className="text-xs mt-1">Семья</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
            >
              <Icon name="Settings" size={22} />
              <span className="text-xs mt-1">Настройки</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;