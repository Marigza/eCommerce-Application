import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Product } from "../../components/CatalogProduct";
import "./Catalog.scss";
import { Filter } from "../../components/Filter";
import { useLocation } from "react-router-dom";
import { Category } from "../../components/Category";
import { getproductList } from "../../client_Api/productList";
import { useEffect, useState } from "react";
import { IProduct } from "../../client_Api/interfaces";

const Catalog: React.FC = () => {
  const location = useLocation();
  const category = {
    phones: "9951a67d-1629-4606-8896-6b22232f09c9",
    tablets: "e85b215d-c6d0-481e-9fc9-589e3a93962e",
    laptops: "717f9204-dda8-4364-8353-8bae22b300d5",
    all: "a183815d-9753-44e1-9c72-91f8ecda440d",
  };

  const [Products, setProducts] = useState<IProduct[]>([]);
  const [filterString, setFilterString] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      if (location.pathname === "/catalog/phones") {
        const response = await getproductList(
          `?filter=categories.id:"${category.phones}"&${filterString}`
        );
        setProducts(response);
      } else if (location.pathname === "/catalog/tablets") {
        const response = await getproductList(
          `?filter=categories.id:"${category.tablets}"&${filterString}`
        );
        setProducts(response);
      } else if (location.pathname === "/catalog/laptops") {
        const response = await getproductList(
          `?filter=categories.id:"${category.laptops}"&${filterString}`
        );
        setProducts(response);
      } else {
        const response = await getproductList(`?${filterString}`);
        setProducts(response);
      }
    };
    loadProducts();
  }, [
    location.pathname,
    category.phones,
    category.tablets,
    category.laptops,
    category.all,
    filterString,
  ]);

  return (
    <>
      <Helmet>
        <title>JustStore - Catalog</title>
      </Helmet>
      <main>
        <Breadcrumbs />
        <div className="category-sort">
          <Category />
        </div>
        <div className="catalog-wrapper">
          <Filter onSearch={setFilterString} />
          <div className="catalog-products">
            {Products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalog;
