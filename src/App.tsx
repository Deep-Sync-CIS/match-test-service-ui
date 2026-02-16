import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Overview from './pages/Overview/Overview'
import RunMatchReport from './pages/RunMatchReport/RunMatchReport'
import Connections from './pages/Connections/Connections'
import PreparingMatchReport from './pages/PreparingMatchReport/PreparingMatchReport'
import Intelligence from './pages/Intelligence/Intelligence'

/**
 * Same routing pattern as first-part-app-1: relative routes only.
 * Host has <Route path="match-test-service/*" element={<MatchTestService />} />.
 * These Routes match relative to that path (index = Overview, path="connections" = Connections, etc.).
 */
interface AppProps {
  userName?: string
  onLogout?: () => void
}

function App({ userName, onLogout }: AppProps) {
  return (
    <Layout userName={userName} onLogout={onLogout}>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="run" element={<RunMatchReport />} />
        <Route path="connections" element={<Connections />} />
        <Route path="preparing-report" element={<PreparingMatchReport />} />
        <Route path="intelligence" element={<Intelligence />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </Layout>
  )
}

export default App
