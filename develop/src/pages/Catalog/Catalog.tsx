import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Product } from "../../components/CatalogProduct";
import "./Catalog.scss";
import { Filter } from "../../components/Filter";
import { Outlet, useLocation } from "react-router-dom";
import { Category } from "../../components/Category";
import { getProductList } from "../../client_Api/productList";
import { useEffect, useState } from "react";
import { IProductResponse } from "../../client_Api/interfaces";
import { Sorting } from "../../components/Sorting";
import Pagination from "@mui/material/Pagination/Pagination";

const Catalog: React.FC<{
  state: boolean;
  changeState: () => void;
}> = (props) => {
  const location = useLocation();
  const category = {
    phones: "9951a67d-1629-4606-8896-6b22232f09c9",
    tablets: "e85b215d-c6d0-481e-9fc9-589e3a93962e",
    laptops: "717f9204-dda8-4364-8353-8bae22b300d5",
    all: "a183815d-9753-44e1-9c72-91f8ecda440d",
  };

  const productsPerPage = 6;
  const [Products, setProducts] = useState<IProductResponse>({
    count: 0,
    limit: productsPerPage,
    offset: 0,
    total: 0,
    results: [],
  });
  const [filterString, setFilterString] = useState<string>("");
  const [sort, setSort] = useState<string>("price asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSortChange = (selectedSort: string): void => {
    setSort(selectedSort);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      let path: string;
      const startIndex = (currentPage - 1) * productsPerPage;

      switch (location.pathname) {
        case "/catalog/phones":
          path = `?filter=categories.id:"${category.phones}"&${filterString}&sort=${sort}&limit=${productsPerPage}&offset=${startIndex}`;
          break;
        case "/catalog/tablets":
          path = `?filter=categories.id:"${category.tablets}"&${filterString}&sort=${sort}&limit=${productsPerPage}&offset=${startIndex}`;
          break;
        case "/catalog/laptops":
          path = `?filter=categories.id:"${category.laptops}"&${filterString}&sort=${sort}&limit=${productsPerPage}&offset=${startIndex}`;
          break;
        default:
          path = `?${filterString}&sort=${sort}&limit=${productsPerPage}&offset=${startIndex}`;
      }

      const response: IProductResponse | null = await getProductList(path);
      if (!response) return;

      setProducts(response);
    };

    loadProducts();
  }, [
    location.pathname,
    category.phones,
    category.tablets,
    category.laptops,
    category.all,
    filterString,
    sort,
    currentPage,
  ]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>JustStore - Catalog</title>
      </Helmet>
      <main>
        <Breadcrumbs />
        <Outlet />
        {!/\/\d+/.test(location.pathname) && (
          <>
            <div className="category-sort">
              <Filter onSearch={setFilterString} />
              <Category />
              <Sorting selectedSort={sort} onSortChange={handleSortChange} />
            </div>
            <div className="catalog-wrapper">
              <div className="catalog-products">
                {Products.results.map((product) => (
                  <Product
                    product={product}
                    key={product.id}
                    state={props.state}
                    changeState={props.changeState}
                  />
                ))}
              </div>
              <Pagination
                count={Math.ceil(Products.total / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Catalog;
