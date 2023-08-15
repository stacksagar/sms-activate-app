import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Ingredient {
  icon: IconProp;
  label: string;
  text: string;
}

export const allIngredients: Ingredient[] = [
  {
    icon: "s",
    text: "Indicate your preference by selecting the specific website from which you would like to receive SMS notifications. Keep updated and engaged with the content that matters most to you, directly through SMS alerts.",
    label: "Select Service",
  },
  {
    icon: "s",
    text: "Choose the country that aligns with your preference, and select it as the origin for your phone number. This step ensures you get a number that corresponds to your desired location and facilitates seamless communication.",
    label: "Select Country",
  },
  {
    icon: "s",
    text: "Easily and confidently replenish your account balance to successfully finalize your order. Our secure top-up process guarantees that your transactions are safeguarded, allowing you to swiftly proceed with your purchase without any concerns about payment.",
    label: "Make a Payment",
  },
];

const [tomato, lettuce, cheese] = allIngredients;
export const initialTabs = [tomato, lettuce, cheese];

export function getNextIngredient(
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}
