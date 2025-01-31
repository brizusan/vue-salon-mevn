import { api } from "@/lib/axios";

export default{
  getServices(){
    return api.get('/services')
  }
}