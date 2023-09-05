import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Breadcrumbs.scss";

const routes = [
  { path: "/catalog", breadcrumb: "Catalog" },
  { path: "/catalog/phones", breadcrumb: "Phones" },
  { path: "/catalog/phones/:prod", breadcrumb: "About" },
  { path: "/catalog/tablets", breadcrumb: "Tablets" },
  { path: "/catalog/tablets/:prod", breadcrumb: "About" },
  { path: "/catalog/laptops", breadcrumb: "Laptops" },
  { path: "/catalog/laptops/:prod", breadcrumb: "About" },
];

const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="breadcrumbs-container">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <span key={match.pathname}>
          {index === 0 ? (
            <>
              <Link to={match.pathname}>
                <HomeIcon style={{ fontSize: "3vh" }} />
              </Link>
            </>
          ) : (
            <>
              <NavigateNextIcon style={{ fontSize: "3vh" }} />
              <Link to={match.pathname}>{breadcrumb}</Link>
            </>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
