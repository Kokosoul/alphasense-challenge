import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Channels from "components/Channels";
import Messages from "components/Messages";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        <Nav />
        <Switch>
          <Route exact path='/' component={Channels} />
          <Route exact path='/channels/:id' component={Messages} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
