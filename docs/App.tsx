import { Route, Router } from "@solidjs/router"
import Hello from "./pages/Hello"
import Layout from "./layout/Layout"
import Empty from "./pages/Empty"

export default () => {
    return <Router root={Layout}>
        <Route path={'/'} component={Hello}></Route>
        <Route path={'/empty'} component={Empty}></Route>
    </Router>
}