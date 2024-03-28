export function setWithExpiry(key: "customer_id", value: string, ttl: number) {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl,
    duration: ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: "customer_id") {
  if (typeof localStorage === "undefined") {
    console.error(
      "localStorage is not available. This function is meant to be used in a client-side environment."
    );
  }
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
