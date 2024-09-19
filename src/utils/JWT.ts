import jwt from 'jsonwebtoken';

interface User{
    email: string;
    password: string;
}

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEArexec+DR89qfE6BOxUy9b/Pau2MRFAlO0W+Vc0W7TTyfav95
A1hWAX4O8w+Wz8+G8zWtmtQCAuugMJEziQqYk+yhFd0SSuS+GSJy6k609IZD5oon
jnydXMGvoBhksQJgpdM7PWBV/FXN2wJTtAGHZTZxnMxeTrncJPp3TKTLjMCSkjtA
Gjk9G9ku2JO19yzpEYhFZWXR+03vnWI+yBDlQ1Q+GOPjusa/pv8Y7ZS6SGRylorv
8G3daTKTFod5Dw2mOQbvAwWpKjIhBb2FmChw4aCZlu7EkncgO63UcuYG4mIbSlUj
5tbe+luBtDVSJ00HzfDnIYaPj+/0F26b0dO6owIDAQABAoIBACMGbOcNKXrgVhTP
vc1B7Qx0oWIHS1MrpLHMtN4n9tZRFRGpLSedTIS0bDJKu2ZSNq0X7EQ32cfYx8PA
Gg7JEX0ItFAA20Q12IqbQ2UoQIzV1SrCO8EYG2CoqMOm5fA3uFrstQthMS/F39Tx
HQYtIKUjV7Hp/jwAdfMEda37qfpIIJc/SJ7+S5Z2v4L9EtUWuKD7k3eQErxD0LuX
alJmK+BAyhP/ozsFZFlRYkzR7SSrYetDckRo9jkdghgWpzGrcPL3AfurNhigJ9sG
LgK4Uy0g5E+qM9Xsgbm5q4eOrB7pAAGD7ywTzGRCYd7u/2vJfPTnbPV1ICyAg4AA
3cZ2cqECgYEA4DlC4WFW9uPDm1Sz9yze3X+md7XkVUcsgi8j5jfwFB7i3+nNfPvy
Bjfx4T3yPK38zPvLf1shycKThWAkciCk3zTYYF5mMpPVU8cg84GgIpuvpVdq5E5D
wrQZ9hUkkeR4BpC4Gc3UKVV3S28J+XlonjfMpAQOTXSggXOPAdsx9/kCgYEAxpI7
cmyPDOfuC735x4QE7KgvOiF9pAiwtlXqv0DwyPLZ/P2DvLMaaQAlPP8yQtGs/6vK
Y4MyCKu1YBRUr/MNXghVaP//cYwdtrin9LkcTlKWMAS7jgVs+xr3gWSAe9PhBjTI
5t9r/JjF1X431MPo0gzrtBqsysjIXi+QCir/xnsCgYBbpav7eRDVmuThwW5JklKJ
kFpXRcZNQOklUOVIfQapArLSuLqf4k7bUdSQrwQq3yacFjLoHDSkRd6MPm7HIyag
gPYL9amp9JjWRGbogMwWOTJCz4dGR+MUWw7dcWjgJNUWQeKt0V5tgpxe/cTC7mff
e4kuZOX/rLLKFpSWOqSi6QKBgH4Kjh9YVwjLIudjI+wHmZSaQLf2UCjRt1FVgdb6
Ipx6wfF6/abGTMo/ZGOuXLnbG6OB6Mp3mUe1rkAZR5QTg/We9o/ahssNNEMqPLny
0cvJUjmSl3ZTbVSKTnZcU83FtLzavncFdCb21gRoxImR/PNvbiF5GRryjXRzXkuF
9aqHAoGAXu9ygZBRtGkpNdLUXR7U8XF6ubLvPixDzpXTIWFvI+vKAFnbydLDetKd
SaVkrewV8oK4nIU2c9OlPLGwm8OR69xj0XeVrEUQlrFIDKdJ790yQbxi/QyCJPYD
nh3uASv6CItQ3c+dRWXRC9Q7e686n1qj7/Pm4EuKrx6ehs2zpZU=
-----END RSA PRIVATE KEY-----`;

export async function generateJwToken(user: User) {
    const token = jwt.sign(JSON.stringify(user), privateKey, {algorithm: 'RS256'});
    return token;
}

export async function verifyToken(token: string){
    return null
}