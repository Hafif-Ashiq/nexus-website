
import Dashboard from "../../public/assets/dashboard.svg"
import Users from "../../public/assets/users.svg"
import Chart from "../../public/assets/chart.svg"
import Configuration from "../../public/assets/configuration.svg"
import Support from "../../public/assets/support.svg"
import Home from "../../public/assets/home.svg"
import Messages from "../../public/assets/messages.svg"
import Community from "../../public/assets/community-filled.svg"



export const adminNavLinks = [
    {
        icon: Dashboard,
        title: "Dashboard",
        link: "/dashboard"
    },
    {
        icon: Users,
        title: "Users",
        link: "/users"
    },
    // {
    //     icon: Chart,
    //     title: "Performance",
    //     link: "/performance"
    // },
    {
        icon: Configuration,
        title: "Configuration",
        link: "/configuration"
    },
    {
        icon: Support,
        title: "Help And Support",
        link: "/support"
    },
]


export const userNavLinks = [
    {
        icon: Home,
        title: "Home",
        link: ""
    },
    {
        icon: Dashboard,
        title: "Library",
        link: "/library"
    },
    {
        icon: Messages,
        title: "AI Chat",
        link: "/ai-chat"
    },
    {
        icon: Community,
        title: "Community",
        link: "/community"
    }
]



export const landingLinks = [
    {
        name: "Home",
        link: ""
    },
    {
        name: "Features",
        link: ""
    },
    {
        name: "Testimonials",
        link: ""
    },
    {
        name: "FAQs",
        link: ""
    },

]