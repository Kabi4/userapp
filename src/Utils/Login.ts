export function clearStorage() {
    localStorage.removeItem("userapp");
}

export function isLoggedIn(): string | null {
    let token = newFunction();
    return token;
    function newFunction() {
        return localStorage.getItem('userapp');
    }
}