import axios from "axios";

export default async function refreshSession() {
    await axios.get("/api/auth/session?update");

    const event = new Event("visibilitychange");
    
    document.dispatchEvent(event);
}
