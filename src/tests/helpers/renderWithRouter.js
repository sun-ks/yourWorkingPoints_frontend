import {MemoryRouter} from "react-router-dom";
import Router from '../../routes';

export const renderWithRouter = (component, initialRoute = '/') => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Router />
      {component}
    </MemoryRouter>
  )
}