type ApartmentPageProps = {
  oferta: string;
};

const ApartmentPage = ({
  oferta,
}: ApartmentPageProps) => {
  return (
    <section>
      <h1>Oferta</h1>
      <p>{oferta}</p>
    </section>
  );
};

export default ApartmentPage;
