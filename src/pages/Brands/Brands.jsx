import useFetchData from '../../hooks/useFetchData';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Brands() {
  const { data: brands, isLoading } = useFetchData('brands');

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <h1 className="text-slate-800 text-3xl font-serif font-bold text-center py-14 hover:text-green-400 duration-700">
        Brands
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            className="border hover:shadow-green-400 hover:shadow-lg duration-700 p-2 text-center flex flex-col items-center justify-center font-serif"
          >
            <img src={brand.image} alt={brand.slug} />
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}









// const {data : brands , isLoading} = useFetchData("brands")      