import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/shared/Login/Login";
import Register from "../Pages/shared/Register/Register";
import Admin from "../Pages/AdminDashboard/Admin";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/shared/UserProfile/UserProfile";
import BookList from "../Components/BookList";
import AllUsers from "../Pages/AdminDashboard/AllUsers/AllUsers";
import Coaching from "../Pages/Home/LibrayCoaching/Coaching";
import AdminHome from "../Pages/AdminDashboard/AdminHome";
import BooksDetails from "../Pages/Home/Books/BooksDetails";
// import ManageClasses from "../Pages/AdminDashboard/CoachingManagement/ManageClasses/ManageClasses";
import ManageStudents from "../Pages/AdminDashboard/CoachingManagement/ManageStudent/ManageStudent";
import ManageSubjects from "../Pages/AdminDashboard/CoachingManagement/ManageSubject/ManageSubjects";
import ManageTutor from "../Pages/AdminDashboard/CoachingManagement/ManageTutor/ManageTutor";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LibraryMemberManagement from "../Pages/AdminDashboard/LibraryManagement/LibraryMemberManagement";
import LibraryMemberList from "../Pages/AdminDashboard/LibraryManagement/LibraryMemberList";
import PaymentManagement from "../Pages/AdminDashboard/LibraryManagement/PaymentManagement";
import FeeTracking from "../Pages/AdminDashboard/LibraryManagement/FeeTracking";
import ReportGeneration from "../Pages/AdminDashboard/LibraryManagement/ReportGeneration";
import MonthlyFeeCollection from "../Pages/AdminDashboard/LibraryManagement/MonthlyFeeCollection";
import ReportView from "../Pages/AdminDashboard/LibraryManagement/ReportView";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "bookList",
        element: (
          <AuthenticatedRoute>
            <BookList />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "book-details/:id",
        element: <BooksDetails />,
      },
      {
        path: "coaching",
        element: <Coaching />,
      },
    ],
  },

  {
    path: "admin",
    element: (
      <AuthenticatedRoute>
        <Admin />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },

      {
        path: "allusers",
        element: <AllUsers />,
      },
      // For Library management
      {
        path: "Library-member",
        element: <LibraryMemberList />,
      },
      {
        path: "payment-member",
        element: <PaymentManagement />,
      },
      {
        path: "payment-report",
        element: <ReportView />,
      },
      // {
      //   path:"class-management",
      //   element:<ManageClasses />
      // },

      // For coaching center
      {
        path: "student-management",
        element: <ManageStudents />,
      },
      {
        path: "subject-management",
        element: <ManageSubjects />,
      },
      {
        path: "tutor-management",
        element: <ManageTutor />,
      },
    ],
  },
  // {
  //   path: "members",
  //   element: <LibraryMemberList />,
  // },
  // {
  //   path: "payments",
  //   element: <PaymentManagement />,
  // },
  //   {
  //     path: "fees",
  //     element: <FeeTracking />,
  //   },
  //   {
  //     path: "reports",
  //     element: <ReportGeneration />,
  //   },
  //   {
  // path:"fee-collect",
  // element:<MonthlyFeeCollection />
  //   },
  //   {
  // path:"report-view",
  // element:<ReportView />
  //   },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default routes;
