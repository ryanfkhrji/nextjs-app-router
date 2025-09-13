export default function Layout({ children, products, analytics }: { children: React.ReactNode; products: React.ReactNode; analytics: React.ReactNode }) {
  return (
    <>
      <div className="p-5">
        <div className="mb-5">{children}</div>
        <div className="flex justify-between items-center gap-4">
          {products}
          {analytics}
        </div>
      </div>
    </>
  );
}
