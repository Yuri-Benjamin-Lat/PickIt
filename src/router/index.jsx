import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SingleWinner from '../pages/SingleWinner'
import MysteryReward from '../pages/MysteryReward'
import TurnOrder from '../pages/TurnOrder'
import RoleAssigner from '../pages/RoleAssigner'
import TeamMaker from '../pages/TeamMaker'
import Elimination from '../pages/Elimination'
import Bracket from '../pages/Bracket'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'single-winner', element: <SingleWinner /> },
      { path: 'mystery-reward', element: <MysteryReward /> },
      { path: 'turn-order', element: <TurnOrder /> },
      { path: 'role-assigner', element: <RoleAssigner /> },
      { path: 'team-maker', element: <TeamMaker /> },
      { path: 'elimination', element: <Elimination /> },
      { path: 'bracket', element: <Bracket /> },
    ],
  },
])
