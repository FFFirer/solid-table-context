import { Route, Router } from "@solidjs/router"
import Hello from "./pages/Hello"

export default () => {
    return <Router>
        <Route path={'/'} component={Hello}></Route>
    </Router>
}