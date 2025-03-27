// import Router from "./router/router";

import Landing from "./pages/landing";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import "react-phone-number-input/style.css";

// import TailwindIndicator from "./components/tailwind-indicator";

function App() {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //     },
  //   },
  // });

  return (
    <>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools position="top" initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toaster
        position="top-center"
        toastOptions={{
          error: {
            duration: 3000,
          },
        }}
      /> */}
      <Landing />
    </>
  );
}

export default App;
