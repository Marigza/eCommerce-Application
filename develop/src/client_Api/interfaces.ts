export interface IToken {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export interface ICustomerInfoForLogin {
  email: string;
  password: string;
}

export interface ICustomerInfoForSingUp extends ICustomerInfoForLogin {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
  }[];
}

export interface ITokenStorage {
  access_token: string;
  creation_time: number;
}

export interface ICustomerStorage {
  ID: string;
  email: string;
}

export interface IProduct {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    [locale: string]: string;
  };
  description: {
    [locale: string]: string;
  };
  categories: {
    typeId: string;
    id: string;
  }[];
  categoryOrderHints: Record<string, unknown>;
  slug: {
    [locale: string]: string;
  };
  metaTitle: {
    [locale: string]: string;
  };
  metaDescription: {
    [locale: string]: string;
  };
  variants: unknown[];
  masterVariant: {
    attributes: {
      name: string;
      value: string;
    }[];
    assets: unknown[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    prices: {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      discounted?: {
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
        discount: {
          typeId: string;
          id: string;
        };
      };
    }[];
    key: string;
    sku: string;
    id: number;
  };
  searchKeywords: Record<string, unknown>;
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface IProductGet {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData: {
    current: {
      name: {
        "en-US": string;
      };
      description: {
        "en-US": string;
      };
      categories: [];
      categoryOrderHints: Record<string, never>;
      slug: {
        "en-US": string;
      };
      metaTitle: {
        "en-US": string;
      };
      metaDescription: {
        "en-US": string;
      };
      masterVariant: {
        id: number;
        sku: string;
        key: string;
        prices: [];
        images: {
          url: string;
          dimensions: {
            w: number;
            h: number;
          };
        }[];
        attributes: [];
        assets: [];
      };
      variants: [];
      searchKeywords: Record<string, never>;
    };
    staged: {
      name: {
        "en-US": string;
      };
      description: {
        "en-US": string;
      };
      categories: [];
      categoryOrderHints: Record<string, never>;
      slug: {
        "en-US": string;
      };
      metaTitle: {
        "en-US": string;
      };
      metaDescription: {
        "en-US": string;
      };
      masterVariant: {
        id: number;
        sku: string;
        key: string;
        prices: {
          id: string;
          value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
          };
          discounted?: {
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: number;
            };
            discount: {
              typeId: string;
              id: string;
            };
          };
        }[];
        images: {
          url: string;
          dimensions: {
            w: number;
            h: number;
          };
        }[];
        attributes: {
          name: string;
          value: string;
        }[];
        assets: [];
      };
      variants: [];
      searchKeywords: Record<string, never>;
    };
    published: boolean;
    hasStagedChanges: boolean;
  };
  key: string;
  priceMode: string;
  lastVariantId: number;
}

export type ProductType = {
  product: IProduct;
};

export interface IBodyOfChangeUserAddres {
  city: string;
  country: string;
  postalcode: string;
  street: string;
  id: string;
  type: string;
  flag: boolean;
}
