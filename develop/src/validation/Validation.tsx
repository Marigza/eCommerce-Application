import * as Yup from "yup";

const ValidationSchema = (registrationStep: number) => {
  const postalCodeRegexMap: Record<string, RegExp> = {
    US: /^\d{5}$/,
    GB: /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/,
    FR: /^(?!(0{2}|97[1-6]|98[0-8]))\d{5}$/,
    DE: /^\d{5}$/,
    PL: /^\d{2}-\d{3}$/,
  };

  return Yup.object().shape({
    firstName:
      registrationStep === 1
        ? Yup.string()
            .required("Required field")
            .matches(/^[a-zA-Z]+$/, "Must contain only latin letters")
        : Yup.string(),
    lastName:
      registrationStep === 1
        ? Yup.string()
            .required("Required field")
            .matches(/^[a-zA-Z]+$/, "Must contain only latin letters")
        : Yup.string(),
    email:
      registrationStep === 0 || registrationStep === 1
        ? Yup.string()
            .test(
              "whitespace",
              "Email address must not contain leading or trailing whitespace",
              (value) => {
                if (value && value !== value.trim()) {
                  return false;
                }
                return true;
              },
            )
            .required("Required field")
            .matches(/^[^@]+@/, "Email address must contain an '@'")
            .matches(/^.*\.[a-zA-Z]{2,}$/, "Email address must contain a domain name")
            .test(
              "email-format",
              "Email address must be properly formatted (e.g., user@example.com)",
              (value) => {
                const atSymbolCount = (value.match(/@/g) || []).length;
                const dotSymbolCount = (value.match(/\./g) || []).length;
                return atSymbolCount === 1 && dotSymbolCount === 1;
              },
            )
        : Yup.string(),
    password:
      registrationStep === 0 || registrationStep === 1
        ? Yup.string()
            .test(
              "whitespace",
              "Password must not contain leading or trailing whitespace",
              (value) => {
                if (value && value !== value.trim()) {
                  return false;
                }
                return true;
              },
            )
            .required("Required field")
            .min(8, "Password must be at least 8 characters long")
            .matches(/[A-Z]/, "Password must contain at least one latin uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one latin lowercase letter (a-z)")
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(
              /[!@#$%^&*]/,
              "Password must contain at least one special character (!@#$%^&*)",
            )
        : Yup.string(),
    dateOfBirth:
      registrationStep === 1
        ? Yup.date()
            .required("Required field")
            .test("age", "Must be at least 13 years old", function (value) {
              if (!value) return false;
              const cutoffDate = new Date();
              cutoffDate.setFullYear(cutoffDate.getFullYear() - 13);
              return value <= cutoffDate;
            })
        : Yup.date(),
    country:
      registrationStep === 2 ? Yup.string().required("Please select a real country") : Yup.string(),
    city:
      registrationStep === 2
        ? Yup.string()
            .required("Required field")
            .matches(/^[a-zA-Z]+$/, "Must contain only latin letters")
        : Yup.string(),
    street: registrationStep === 2 ? Yup.string().required("Required field") : Yup.string(),
    postalcode:
      registrationStep === 2
        ? Yup.string().test(
            "postal-code-format",
            "Postal code format is not valid for the selected country",
            function (value) {
              const selectedCountry = this.parent.country;
              if (!selectedCountry || !postalCodeRegexMap[selectedCountry]) {
                return true;
              }
              return postalCodeRegexMap[selectedCountry].test(value || "");
            },
          )
        : Yup.string(),
    countryB:
      registrationStep === 3 ? Yup.string().required("Please select a real country") : Yup.string(),
    cityB:
      registrationStep === 3
        ? Yup.string()
            .required("Required field")
            .matches(/^[a-zA-Z]+$/, "Must contain only latin letters")
        : Yup.string(),
    streetB: registrationStep === 3 ? Yup.string().required("Required field") : Yup.string(),
    postalcodeB:
      registrationStep === 3
        ? Yup.string().test(
            "postal-code-format",
            "Postal code format is not valid for the selected country",
            function (value) {
              const selectedCountry = this.parent.countryB;
              if (!selectedCountry || !postalCodeRegexMap[selectedCountry]) {
                return true;
              }
              return postalCodeRegexMap[selectedCountry].test(value || "");
            },
          )
        : Yup.string(),
  });
};
export default ValidationSchema;
