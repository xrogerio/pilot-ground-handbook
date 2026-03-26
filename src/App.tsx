import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/contexts/AppContext'
import { AuthProvider } from '@/hooks/use-auth'
import Index from './pages/Index'
import AircraftDetails from './pages/AircraftDetails'
import EditAircraft from './pages/EditAircraft'
import StudentManagement from './pages/StudentManagement'
import QuizGenerator from './pages/QuizGenerator'
import ComparisonDashboard from './pages/ComparisonDashboard'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/aircraft/:id" element={<AircraftDetails />} />
              <Route path="/aircraft/:id/edit" element={<EditAircraft />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/quiz" element={<QuizGenerator />} />
              <Route path="/compare" element={<ComparisonDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
