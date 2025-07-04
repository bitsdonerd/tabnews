import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (response.status !== 200) {
          throw Error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        throw error;
      }
    }
  }
}

export default {
  waitForAllServices,
};
