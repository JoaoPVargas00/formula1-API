import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
  methods: ["GET"]
});

const teams = [
  { id: 1, name: "Red Bull Racing", base: "Milton Keynes, Inglaterra" },
  { id: 2, name: "Mercedes", base: "Brackley, Inglaterra" },
  { id: 3, name: "Ferrari", base: "Maranello, Itália" },
  { id: 4, name: "McLaren", base: "Woking, Inglaterra" },
  { id: 5, name: "Aston Martin", base: "Silverstone, Inglaterra" },
  { id: 6, name: "Alpine", base: "Enstone, Inglaterra / Viry-Châtillon, França" },
  { id: 7, name: "Williams", base: "Grove, Inglaterra" },
  { id: 8, name: "RB (Visa Cash App RB)", base: "Faenza, Itália" },
  { id: 9, name: "Kick Sauber", base: "Hinwil, Suíça" },
  { id: 10, name: "Haas", base: "Kannapolis, EUA" }
];


const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Sergio Pérez", team: "Red Bull Racing" },
  { id: 3, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "George Russell", team: "Mercedes" },
  { id: 6, name: "Mick Schumacher", team: "Mercedes" }, // Supondo entrada de Schumacher no lugar de Hamilton
  { id: 7, name: "Lando Norris", team: "McLaren" },
  { id: 8, name: "Oscar Piastri", team: "McLaren" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Esteban Ocon", team: "Alpine" },
  { id: 12, name: "Pierre Gasly", team: "Alpine" },
  { id: 13, name: "Alexander Albon", team: "Williams" },
  { id: 14, name: "Logan Sargeant", team: "Williams" },
  { id: 15, name: "Daniel Ricciardo", team: "RB (Visa Cash App RB)" },
  { id: 16, name: "Yuki Tsunoda", team: "RB (Visa Cash App RB)" },
  { id: 17, name: "Valtteri Bottas", team: "Kick Sauber" },
  { id: 18, name: "Zhou Guanyu", team: "Kick Sauber" },
  { id: 19, name: "Kevin Magnussen", team: "Haas" },
  { id: 20, name: "Nico Hülkenberg", team: "Haas" }
];


server.get("/teams", async (request, reply) => {
  reply.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, reply) => {
  reply.type("application/json").code(200);
  return { drivers };
});

interface DriversParams {
  id: string;
}

server.get<{ Params: DriversParams }>("/drivers/:id", async (request, reply) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    reply.type("application/json").code(404);
    return { message: "Driver Not Found" };
  } else {
    reply.type("application/json").code(200);
    return { driver };
  }
});

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});