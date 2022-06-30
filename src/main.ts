import app from "@/external/http/app";
import { config } from "@/config";

app.listen(config.PORT, () => {
  console.info("server started on PORT:", config.PORT)
  console.info("server running with STAGE:", config.STAGE)
});
