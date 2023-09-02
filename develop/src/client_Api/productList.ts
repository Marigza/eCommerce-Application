import { region, projectKey, tokenGenerate } from "./tokenGenerate";

export const getproductList = async (endPath: string) => {
  const token: string | null = await tokenGenerate();

  if (!token) return null;

  const url = `https://api.${region}.commercetools.com/${projectKey}/product-projections/search${endPath}`;

  // try {
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
  // } catch (error) {
  // return null;
  // }
};

//** Фильтры:                                                                                                   */
//**         1. По цвету (не работает)     `?filter=variants.attributes.color:"white,gray"`                     */
//**         2. По sku  (работает)     `?filter=variants.sku:"white"`                                           */
//**         3. По type  (не работает)     `?filter=productType.id:"3acd22c7-8640-4b36-a37c-464e6078fc87"`      */
//**         3. По цене  (работает)     `?filter=variants.price.centAmount:range (0 to 80000)`                  */
//**         3. По category тоже не работает                                                                    */
