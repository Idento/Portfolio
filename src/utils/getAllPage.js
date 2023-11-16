import { APPSICON } from "../components/SinglePageApp/SinglePageApp";

export default function getAllPage() {
    let all = {}
    Object.keys(APPSICON).map((v) => {
        all[v] = false
    })
    return all
}