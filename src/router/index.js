import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/access-and-identity/pages/Login.vue'
import RegisterView from '@/access-and-identity/pages/Register.vue'
import CompanyRegisterView from '@/transport-company/pages/CompanyRegister.vue'
import RoutesPage from '@/network/pages/RoutesPage.vue'
import RouteCompleteDetailsComponent from "@/discovery/pages/route-complete-details.component.vue";
import StopsPage from "@/network/pages/StopsPage.vue";
import HomePage from "@/transport-company/pages/HomePage.vue";
import CompanyLayout from "@/shared/components/CompanyLayout.vue";
import RoutesList from "@/discovery/components/routes-list/routes-list.vue";
import TravellerLayout from "@/shared/components/TravellerLayout.vue";
import {APP_ROUTES} from "@/shared/services/routes.js";
import CompanyInformation from "@/transport-company/pages/CompanyInformation.vue";
import Suscription from "@/shared/components/Suscription.vue"

const routes = [
    // REDIRECCIÓN INICIAL AL LOGIN
    {
        path: "/",
        redirect: `${APP_ROUTES.AUTH.ROOT}/${APP_ROUTES.AUTH.LOGIN}`
    },

    /*ROUTES FOR PUBLIC AND TRAVELLER DASHBOARD*/
    {
        path: "/",
        component: TravellerLayout,
        children: [
            {
                path: "/test",
                component: RoutesList,
            },
            {
                path: "/routes/:routeId",
                name: "route-detail",
                component: () => import('@/discovery/pages/RouteDetailPage.vue'),
                props: true
            },
            {
                path: "dashboard",
                name: "Discovery",
                component: () => import('@/discovery/pages/routes-alpha-dashboard.vue')
            }
        ]
    },
    /*ROUTES FOR AUTHENTICATION*/
    {
        path: APP_ROUTES.AUTH.ROOT,
        redirect: APP_ROUTES.AUTH.ROOT +"/"+ APP_ROUTES.AUTH.LOGIN,
        children: [
            {
                path: APP_ROUTES.AUTH.LOGIN,
                name: "LoginView",
                component: LoginView,
            },
            {
                path: APP_ROUTES.AUTH.REGISTER,
                component: RegisterView,
            },
        ]
    },
    /* ROUTES FOR COMPANY*/
    {
        path: "/"+APP_ROUTES.COMPANY.ROOT,
        children: [
            {
                path: APP_ROUTES.COMPANY.ONBOARDING,
                component: CompanyRegisterView,
            },
            {
                path: "",
                component: CompanyLayout,
                children: [
                    {
                        path: APP_ROUTES.COMPANY.HOME,
                        component: HomePage
                    },
                    {
                        path: APP_ROUTES.COMPANY.STOPS,
                        component: StopsPage,
                    },
                    {
                        path: APP_ROUTES.COMPANY.ROUTES,
                        component: RoutesPage,
                    },
                    {
                        path: APP_ROUTES.COMPANY.PROFILE,
                        component: () => import('@/transport-company/pages/ProfilePage.vue')
                    },
                    {
                        path: APP_ROUTES.COMPANY.INFORMATION,
                        component: CompanyInformation,
                    },
                    {
                        path: APP_ROUTES.COMPANY.SUSCRIPTION,
                        component: Suscription
                    },

                ]

            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router