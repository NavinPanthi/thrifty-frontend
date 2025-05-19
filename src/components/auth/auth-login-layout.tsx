function AuthLogInLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 lg:px-0">
      <div className="flex items-start justify-center">
        <img
          src="/public/logo.png"
          alt="logo"
          className="mt-6 w-[150px] lg:w-[200px]"
        />
      </div>

      <div className="rounded-[32px] bg-white p-12 shadow-2xl md:min-w-[480px]">
        <div className="text-center">
          <h2 className="title-screen text-neutral-600">Sign in to Thrifty</h2>
          <p className="body-large mt-3 text-neutral-400">
            Enter the details below and sign in
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default AuthLogInLayout;
