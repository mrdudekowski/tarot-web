# ⚛️ REACT - BEST PRACTICES И ПРИНЦИПЫ

> **Важно:** Эти принципы основаны на фундаментальных правилах из `cursor-rules.md`. React-специфичные практики должны следовать им.

---

## 🏛️ ФУНДАМЕНТАЛЬНЫЕ ПРИНЦИПЫ REACT

### 1. Функциональные компоненты и Hooks (всегда)
**Принцип:** Всегда используй функциональные компоненты с Hooks. Классовые компоненты - legacy.

**Почему:**
- Меньше кода, проще читать
- Лучшая производительность (меньше overhead)
- Hooks дают больше гибкости
- Современный стандарт React

**Практика:**
```tsx
// ✅ Хорошо - функциональный компонент
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;
  if (!user) return <NotFound />;

  return <div>{user.name}</div>;
}

// ❌ Плохо - классовый компонент (legacy)
class UserProfile extends React.Component {
  // устаревший подход, не используй
}
```

**Правило:** Функциональные компоненты **всегда**. Классовые компоненты только для Error Boundaries (пока нет функциональной альтернативы).

---

### 2. Правила использования Hooks (критично!)
**Принцип:** Hooks можно вызывать только на верхнем уровне компонента, не в условиях, циклах или вложенных функциях.

**Почему критично:**
- React полагается на **порядок вызовов** hooks для правильной работы
- Нарушение правил ведёт к багам и непредсказуемому поведению
- React не может отследить hooks, если они вызываются условно

**Что происходит при нарушении:**
- Баги с состоянием (состояние "перепрыгивает" между рендерами)
- Ошибки "Rendered fewer hooks than expected"
- Непредсказуемое поведение компонентов

**Практика:**
```tsx
// ✅ Хорошо - hooks на верхнем уровне
function Component({ condition }: { condition: boolean }) {
  const [state, setState] = useState(0);
  const value = useMemo(() => computeValue(state), [state]);

  if (condition) {
    return <div>Early return</div>;
  }

  return <div>{value}</div>;
}

// ❌ Плохо - hook в условии (ОШИБКА!)
function Component({ condition }: { condition: boolean }) {
  if (condition) {
    const [state, setState] = useState(0); // НЕЛЬЗЯ!
    return <div>{state}</div>;
  }
  return <div>Other</div>;
}
```

**Правило:** Все hooks **всегда** на верхнем уровне компонента, **до** любых условий и циклов.

---

### 3. Правильные зависимости в useEffect (критично!)
**Принцип:** Всегда указывай **все** зависимости в массиве зависимостей `useEffect`. ESLint поможет, но понимай почему.

**Почему критично:**
- Пропущенные зависимости = баги (stale closures, устаревшие значения)
- Лишние зависимости = лишние перезапуски эффекта
- React не может автоматически определить зависимости

**Что происходит при нарушении:**
- Stale closures (используются устаревшие значения)
- Эффект не запускается когда нужно
- Эффект запускается слишком часто

**Практика:**
```tsx
// ✅ Хорошо - все зависимости указаны
function UserProfile({ userId, filters }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId, filters).then(setUser);
  }, [userId, filters]); // все зависимости

  return <div>{user?.name}</div>;
}

// ❌ Плохо - пропущены зависимости (БАГ!)
function UserProfile({ userId, filters }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId, filters).then(setUser);
    // filters не указан - эффект не обновится при изменении filters!
  }, [userId]); // БАГ!

  return <div>{user?.name}</div>;
}
```

**Правило:** Все значения из области видимости компонента, используемые в эффекте, должны быть в массиве зависимостей. Используй ESLint правило `exhaustive-deps`.

---

### 4. Мемоизация - когда и зачем
**Принцип:** Используй `useMemo`, `useCallback`, `React.memo` **только когда это действительно нужно**. Преждевременная оптимизация - зло.

**Когда нужно:**
- **useMemo**: дорогие вычисления (сложные алгоритмы, большие массивы)
- **useCallback**: функции передаются в memoized компоненты или в зависимости других hooks
- **React.memo**: компонент рендерится часто с теми же props

**Когда НЕ нужно:**
- Простые вычисления (сложение, конкатенация строк)
- Компоненты, которые рендерятся редко
- Функции, которые не передаются в memoized компоненты

**Практика:**
```tsx
// ✅ Хорошо - мемоизация дорогих вычислений
function ExpensiveComponent({ items, filter }: Props) {
  // Дорогое вычисление - мемоизируем
  const filteredItems = useMemo(
    () => items.filter(item => {
      // Сложная логика фильтрации
      return complexFilter(item, filter);
    }),
    [items, filter]
  );

  // Функция передаётся в memoized компонент
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return <ItemList items={filteredItems} onClick={handleClick} />;
}

// ❌ Плохо - избыточная мемоизация
const Component = React.memo(({ simpleProp }: { simpleProp: string }) => {
  // Простое вычисление - мемоизация не нужна
  const value = useMemo(() => simpleProp.toUpperCase(), [simpleProp]);
  return <div>{value}</div>;
});
```

**Правило:** Мемоизируй только **доказанные узкие места**. Измерь производительность перед оптимизацией.

---

### 5. Управление состоянием - правильный выбор инструмента
**Принцип:** Выбирай инструмент в зависимости от **масштаба** и **частоты изменений** состояния.

**Иерархия выбора:**
1. **useState** - локальное состояние компонента (по умолчанию)
2. **useReducer** - сложное локальное состояние с логикой
3. **Context API** - глобальное состояние, которое редко меняется (тема, язык)
4. **Zustand/Redux** - сложное глобальное состояние, часто меняющееся

**Практика:**
```tsx
// ✅ Хорошо - правильный выбор инструмента

// 1. Простое локальное состояние
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// 2. Сложное локальное состояние
function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialCart);
  return <CartView state={state} dispatch={dispatch} />;
}

// 3. Глобальное состояние (редко меняющееся)
const ThemeContext = createContext<Theme>('light');
function App() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={theme}>
      {/* ... */}
    </ThemeContext.Provider>
  );
}

// 4. Сложное глобальное состояние (часто меняющееся)
const useStore = create<StoreState>((set) => ({
  user: null,
  cart: [],
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),
}));
```

**Правило:** Начинай с **useState**. Переходи на более сложные инструменты только когда это **действительно нужно**.

---

### 6. Разделение Container и Presentational компонентов
**Принцип:** Разделяй компоненты на "умные" (логика, данные) и "глупые" (представление).

**Почему:**
- Переиспользование: presentational компоненты можно использовать везде
- Тестируемость: легче тестировать изолированные компоненты
- Чистая архитектура: разделение concerns
- Следует принципу Single Responsibility

**Практика:**
```tsx
// ✅ Хорошо - разделение ответственности

// Presentational компонент (глупый) - только представление
interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={onEdit}>Редактировать</button>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
}

// Container компонент (умный) - логика и данные
function UserCardContainer({ userId }: { userId: string }) {
  const user = useUser(userId);
  const { editUser, deleteUser } = useUserActions();

  if (!user) return <NotFound />;

  return (
    <UserCard
      user={user}
      onEdit={() => editUser(userId)}
      onDelete={() => deleteUser(userId)}
    />
  );
}
```

**Правило:** Логика и данные в Container, представление в Presentational компонентах.

---

### 7. Обработка ошибок - Error Boundaries
**Принцип:** Используй Error Boundaries для обработки ошибок в компонентах. Не позволяй одной ошибке уронить всё приложение.

**Почему:**
- Предотвращение падения всего приложения
- Лучший UX (показываем fallback UI)
- Возможность логирования ошибок
- Изоляция проблемных компонентов

**Практика:**
```tsx
// ✅ Хорошо - Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логирование в сервис мониторинга
    console.error('Error caught:', error, errorInfo);
    // sendToErrorTracking(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Использование
<ErrorBoundary fallback={<CustomError />}>
  <App />
</ErrorBoundary>
```

**Правило:** Оберни критические секции приложения в Error Boundaries.

---

### 8. Типизация с TypeScript (критично!)
**Принцип:** Все компоненты, props, состояния должны быть **полностью типизированы**. Следует фундаментальному принципу Type Safety First.

**Почему критично:**
- Предотвращение ошибок на этапе компиляции
- Автодополнение и поддержка IDE
- Самодокументируемый код
- Безопасный рефакторинг

**Практика:**
```tsx
// ✅ Хорошо - полная типизация
interface UserCardProps {
  user: User;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  className?: string;
}

function UserCard({ user, onEdit, onDelete, className }: UserCardProps) {
  return (
    <div className={cn("card", className)}>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Редактировать</button>
      <button onClick={() => onDelete(user.id)}>Удалить</button>
    </div>
  );
}

// Типизация событий
function Input({ onChange }: { onChange: (value: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return <input onChange={handleChange} />;
}
```

**Правило:** TypeScript strict mode **всегда**. Никаких `any` в props или состояниях.

---

### 9. Кастомные Hooks для переиспользования логики
**Принцип:** Выноси повторяющуюся логику в кастомные hooks. Следует принципу DRY.

**Почему:**
- Переиспользование логики
- Тестируемость (можно тестировать hooks отдельно)
- Чистота компонентов (логика отделена от представления)
- Следует Single Responsibility

**Практика:**
```tsx
// ✅ Хорошо - кастомный hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Использование
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  if (!user) return <NotFound />;
  
  return <div>{user.name}</div>;
}
```

**Правило:** Если логика повторяется в **2+ компонентах**, вынеси её в кастомный hook.

---

### 10. Оптимизация рендеринга - избегай лишних перерисовок
**Принцип:** Избегай лишних перерисовок, но не переусложняй. Оптимизируй только доказанные узкие места.

**Практика:**
```tsx
// ✅ Хорошо - избегаем лишних рендеров

// 1. Мемоизация компонентов (когда нужно)
const MemoizedItem = React.memo(Item, (prev, next) => {
  return prev.id === next.id && prev.name === next.name;
});

// 2. Поднятие состояния (если нужно нескольким детям)
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} />
    </>
  );
}

// 3. Разделение контекстов (не создавай один большой контекст)
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme>('light');

// ❌ Плохо - один большой контекст
const AppContext = createContext<{
  user: User | null;
  theme: Theme;
  language: string;
  // ... всё в одном
}>({ /* ... */ });
```

**Правило:** Оптимизируй рендеринг только после **измерения** и доказательства проблемы.

---

### 11. Формы и управляемые компоненты
**Принцип:** Используй управляемые компоненты. Для сложных форм используй библиотеки (react-hook-form + Zod).

**Практика:**
```tsx
// ✅ Хорошо - управляемая форма
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm({ email, password });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Отправка формы
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!errors.email}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* ... */}
    </form>
  );
}

// Для сложных форм используй react-hook-form + Zod
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function ComplexForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  
  return <form onSubmit={handleSubmit(onSubmit)}>{/* ... */}</form>;
}
```

**Правило:** Простые формы - управляемые компоненты. Сложные формы - react-hook-form + Zod.

---

### 12. Роутинг - React Router с lazy loading
**Принцип:** Используй React Router для навигации. Lazy loading для страниц (code splitting).

**Практика:**
```tsx
// ✅ Хорошо - lazy loading страниц
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const ReadingPage = lazy(() => import('./pages/ReadingPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading" element={<ReadingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**Правило:** Все страницы должны быть lazy-loaded для уменьшения initial bundle size.

---

### 13. Тестирование компонентов
**Принцип:** Пиши тесты для компонентов, особенно для критической логики. Следует принципу Testing из cursor-rules.md.

**Практика:**
```tsx
// ✅ Хорошо - тестирование компонента
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders user information', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserCard user={user} onEdit={jest.fn()} onDelete={jest.fn()} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserCard user={user} onEdit={onEdit} onDelete={jest.fn()} />);
    
    fireEvent.click(screen.getByText('Редактировать'));
    expect(onEdit).toHaveBeenCalledWith('1');
  });
});
```

**Правило:** Тестируй **критическую логику** и **пользовательские взаимодействия**.

---

## 📚 Рекомендуемые библиотеки

### State Management
- **Zustand** - легковесный state management (рекомендуется для большинства случаев)
- **Redux Toolkit** - для сложных приложений с большим количеством состояния
- **Jotai** - атомарный state management

### Forms
- **react-hook-form** - производительные формы с валидацией
- **Zod** - схема валидации, работает отлично с react-hook-form

### Routing
- **React Router** - стандарт для роутинга в React

### UI Components
- **Headless UI** - доступные компоненты без стилей
- **Radix UI** - примитивы для UI компонентов
- **shadcn/ui** - копируемые компоненты на основе Radix UI

### Data Fetching
- **TanStack Query (React Query)** - мощная библиотека для работы с серверным состоянием
- **SWR** - альтернатива React Query

### Animations
- **Framer Motion** - мощная библиотека анимаций
- **React Spring** - физически точные анимации

---

## 🎯 Чек-лист разработки на React

- [ ] Использую функциональные компоненты с Hooks (всегда)
- [ ] Hooks вызываются только на верхнем уровне (критично!)
- [ ] Все зависимости в useEffect указаны (критично!)
- [ ] Мемоизация только для доказанных узких мест
- [ ] Правильный выбор инструмента для state management
- [ ] Разделение Container/Presentational компонентов
- [ ] Error Boundaries для обработки ошибок
- [ ] Полная типизация с TypeScript (критично!)
- [ ] Кастомные hooks для переиспользования логики (DRY)
- [ ] Оптимизация рендеринга только после измерения
- [ ] Управляемые формы или react-hook-form для сложных форм
- [ ] Lazy loading для страниц (code splitting)
- [ ] Тесты для критических компонентов

---

## 📖 Дополнительные принципы

### Composition over Configuration
Предпочитай композицию компонентов через children и render props.

### Unidirectional Data Flow
Данные всегда текут вниз (props), события вверх (callbacks).

### Thinking in React
1. Разбей UI на компоненты
2. Построй статическую версию
3. Определи минимальное состояние
4. Определи где должно жить состояние
5. Добавь обратный поток данных

---

## 🚀 Performance Tips (только после измерения!)

1. **Code Splitting** - используй `React.lazy()` для больших компонентов
2. **Virtualization** - для длинных списков используй `react-window` или `react-virtual`
3. **Debounce/Throttle** - для частых событий (поиск, скролл)
4. **Избегай inline функций в JSX** - мемоизируй через `useCallback` (только если передаётся в memoized компонент)
5. **Избегай inline объектов в JSX** - мемоизируй через `useMemo` (только если это узкое место)

**Помни:** Оптимизируй только после **измерения** производительности!
