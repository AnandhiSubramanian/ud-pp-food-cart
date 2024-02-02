import MealItem from "./meal-item";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  /*   const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      console.log("here");
      const response = await fetch("http://localhost:3000/meals");

      if (response.ok) {
        const meals = await response.json("meals");
        setLoadedMeals(meals);
        console.log(meals);
      } else {
        return;
      }
    }
    getMeals();
  }, []); */
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <Error msg={error} title="failed to fetch meals" />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((item) => (
        <MealItem key={item.id} meal={item} />
      ))}
    </ul>
  );
}
