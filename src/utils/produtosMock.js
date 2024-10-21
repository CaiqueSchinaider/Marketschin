var produtos = [
  {
    id: 1,
    name: "Liquidificador Multiverso",
    valor: "150.00",
    link: "https://example.com/liquidificador",
    thumb: "/categorias/categoria-cozinha/liquidificador.jpg",
    categoria: "Cozinha",
  },
  {
    id: 2,
    name: "Panela de Pressão Vortex",
    valor: "200.00",
    link: "https://example.com/panela",
    thumb: "/categorias/categoria-cozinha/panela-de-pressão.jpg",
    categoria: "Cozinha",
  },
  {
    id: 3,
    name: "Conjunto de Facas Celestiais",
    valor: "120.00",
    link: "https://example.com/facas",
    thumb: "/categorias/categoria-cozinha/facas.jpg",
    categoria: "Cozinha",
  },
  {
    id: 4,
    name: "Batedeira Harmônica",
    valor: "250.00",
    link: "https://example.com/batedeira",
    thumb: "/categorias/categoria-cozinha/batedeira.jpg",
    categoria: "Cozinha",
  },
  {
    id: 5,
    name: "Cafeteira Mística",
    valor: "180.00",
    link: "https://example.com/cafeteira",
    thumb: "/categorias/categoria-cozinha/cafeteira.jpg",
    categoria: "Cozinha",
  },
  {
    id: 6,
    name: "Sofá Sonhador",
    valor: "1200.00",
    link: "https://example.com/sofa",
    thumb: "/categorias/categoria-saladeestar/sofa.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 7,
    name: "Televisão Enigmática",
    valor: "2500.00",
    link: "https://example.com/tv",
    thumb: "/categorias/categoria-saladeestar/televisão.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 8,
    name: "Estante de Ideias",
    valor: "700.00",
    link: "https://example.com/estante",
    thumb: "/categorias/categoria-saladeestar/estante.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 9,
    name: "Piverstation Espacial",
    valor: "3500.00",
    link: "https://example.com/tapete",
    thumb: "/categorias/categoria-saladeestar/piverstation.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 10,
    name: "Luminária dos Sonhos",
    valor: "150.00",
    link: "https://example.com/luminaria",
    thumb: "/categorias/categoria-saladeestar/luminaria.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 11,
    name: "Quadro Decorativo do Destino",
    valor: "300.00",
    link: "https://example.com/quadro",
    thumb: "/categorias/categoria-saladeestar/quadro.jpg",
    categoria: "Sala de Estar",
  },
  {
    id: 12,
    name: "Chuveiro Cósmico",
    valor: "400.00",
    link: "https://example.com/chuveiro",
    thumb: "/categorias/categoria-banheiro/chuveiro.jpg",
    categoria: "Banheiro",
  },
  {
    id: 13,
    name: "Pia de Banheiro Líquida",
    valor: "250.00",
    link: "https://example.com/pia",
    thumb: "/categorias/categoria-banheiro/pia de banheiro.jpg",
    categoria: "Banheiro",
  },
  {
    id: 14,
    name: "Suporte de Sabão Fluido",
    valor: "50.00",
    link: "https://example.com/suporte",
    thumb: "/categorias/categoria-banheiro/suporte de sabão.jpg",
    categoria: "Banheiro",
  },
  {
    id: 15,
    name: "Vaso Sanitário do Amanhã",
    valor: "600.00",
    link: "https://example.com/vaso",
    thumb: "/categorias/categoria-banheiro/Vaso sanitario.jpg",
    categoria: "Banheiro",
  },
  {
    id: 16,
    name: "Armário de Cozinha Visionário",
    valor: "800.00",
    link: "https://example.com/armario",
    thumb: "/categorias/categoria-cozinha/Armario de Cozinha.jpg",
    categoria: "Cozinha",
  },
  {
    id: 17,
    name: "Fogão do Futuro",
    valor: "1200.00",
    link: "https://example.com/fogao",
    thumb: "/categorias/categoria-cozinha/fogão.jpg",
    categoria: "Cozinha",
  },
  {
    id: 18,
    name: "Mesa de Jantar Estelar",
    valor: "900.00",
    link: "https://example.com/mesa",
    thumb: "/categorias/categoria-cozinha/Mesa de Jantar.jpg",
    categoria: "Cozinha",
  },
  {
    id: 19,
    name: "Microondas da Galáxia",
    valor: "500.00",
    link: "https://example.com/microondas",
    thumb: "/categorias/categoria-cozinha/Microondas.jpg",
    categoria: "Cozinha",
  },
  {
    id: 20,
    name: "Cadeira Moderna do Destino",
    valor: "350.00",
    link: "https://example.com/cadeira",
    thumb: "/categorias/categoria-quarto/Cadeira moderna.jpg",
    categoria: "Quarto",
  },
  {
    id: 21,
    name: "Cama dos Sonhos",
    valor: "1200.00",
    link: "https://example.com/cama",
    thumb: "/categorias/categoria-quarto/Cama.jpg",
    categoria: "Quarto",
  },
  {
    id: 22,
    name: "Computador Intergaláctico",
    valor: "3000.00",
    link: "https://example.com/computador",
    thumb: "/categorias/categoria-quarto/Computador.jpg",
    categoria: "Quarto",
  },
  {
    id: 23,
    name: "Guarda Roupa Místico",
    valor: "1000.00",
    link: "https://example.com/guarda",
    thumb: "/categorias/categoria-quarto/Guada roupa.jpg",
    categoria: "Quarto",
  },
  {
    id: 24,
    name: "Carro RapLaren YCence",
    valor: "50000.00",
    link: "https://example.com/carro",
    thumb: "/categorias/categoria-outros/carro futurista.jpg",
    categoria: "Outros",
  },
  {
    id: 25,
    name: "Celular da Nova Era",
    valor: "2000.00",
    link: "https://example.com/celular",
    thumb: "/categorias/categoria-outros/celular.jpg",
    categoria: "Outros",
  },
  {
    id: 26,
    name: "Máquina de Lavar Épica",
    valor: "1500.00",
    link: "https://example.com/maquina",
    thumb: "/categorias/categoria-outros/maquina de lavar.jpg",
    categoria: "Outros",
  },
  {
    id: 27,
    name: "Moto Vortex 3K",
    valor: "10000.00",
    link: "https://example.com/moto",
    thumb: "/categorias/categoria-outros/moto.jpg",
    categoria: "Outros",
  },
];

export default produtos;
