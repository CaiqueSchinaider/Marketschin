import { useContext, useEffect, useState } from 'react';
import styles from './CodeVerification.module.css';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import { SegurityPasswordContext } from '../../contexts/SegurityPassword';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

function PassCodeVerification() {
  const firebaseConfig = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'users');
  const productCollectionRef = collection(dataBase, 'product');
  const { status } = useParams();
  const [, setCheckSegurity] = useContext(SegurityPasswordContext);
  const [parameterUtils] = useContext(ParameterUtilsContext);
  const [codeUser, setCodeUser] = useState();
  const [inputError, setInputError] = useState('2px solid white');
  const [infoError, setInfoError] = useState('');

  const navigate = useNavigate();
  console.log(parameterUtils.message);
  async function createUser() {
    try {
      addDoc(userCollectionRef, {
        nickname: parameterUtils.nickname,
        email: parameterUtils.destino,
        senha: parameterUtils.senha,
      });
      console.log('Usuario adicionado');
      navigate('/');
    } catch (error) {
      console.error(error.name);
    }
  }
  // async function sendProducts() {  ( !!! SO USAR PARA ADICIONAR PRODUCTS PARA TESTE)
  //   const list = [
  //     {
  //       name: 'Liquidificador Multiverso',
  //       valor: '150.00',
  //       link: 'https://example.com/liquidificador',
  //       thumb: '/categorias/categoria-cozinha/liquidificador.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'Transforme ingredientes em possibilidades com o Liquidificador Multiverso. Este liquidificador versátil é o seu novo aliado na cozinha, projetado para tornar a preparação de alimentos uma experiência prática e agradável. Ideal para smoothies, sopas, molhos e até sorvetes caseiros, ele oferece a versatilidade que você precisa para explorar novas receitas. Com sua potência de 600W, o Liquidificador Multiverso garante uma mistura eficiente e rápida, permitindo que você obtenha resultados incríveis em poucos minutos. As lâminas de aço inoxidável são afiadas e duráveis, proporcionando cortes precisos e uma textura suave em todas as suas criações.\n\nSeu design ergonômico e moderno se adapta a qualquer ambiente, enquanto a base antiderrapante garante segurança durante o uso. Com três velocidades e a função pulsar, você tem total controle sobre a consistência dos seus ingredientes. Além disso, o copo de 1,5 litros é ideal para preparar porções generosas, perfeito para famílias ou para receber amigos.\n\nA limpeza também é um aspecto que foi cuidadosamente pensado; o copo e a tampa são de fácil remoção, podendo ser lavados à mão ou em lava-louças, tornando o seu dia a dia ainda mais prático. Descubra o prazer de cozinhar e surpreenda-se com as possibilidades que o Liquidificador Multiverso pode trazer para a sua cozinha. Não importa se você é um cozinheiro experiente ou um iniciante, este liquidificador é a ferramenta que faltava para elevar suas habilidades culinárias a um novo patamar.',
  //       especificacoes:
  //         'Potência: 600W;\nCapacidade: 1,5 litros;\nLâminas em aço inoxidável;\n3 velocidades;\nFunção pulsar;\nBase antiderrapante;\nCopo e tampa de fácil limpeza.',
  //     },
  //     {
  //       name: 'Panela de Pressão Vortex',
  //       valor: '200.00',
  //       link: 'https://example.com/panela',
  //       thumb: '/categorias/categoria-cozinha/panela-de-pressão.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'Revolucione suas refeições com a Panela de Pressão Vortex, trazendo o cozimento rápido e profundo para criar sabores intensos. Com tecnologia de ponta, esta panela garante que seus pratos sejam preparados de maneira eficiente e saborosa, reduzindo o tempo de cozimento em até 70%. A pressão interna otimiza o aquecimento, permitindo que os alimentos mantenham seus nutrientes e se tornem mais macios e saborosos.\n\nSua capacidade de 4,5 litros é perfeita para preparar porções generosas, ideal para famílias e encontros. O design ergonômico da alça proporciona um manuseio seguro e confortável, enquanto o sistema de segurança triplo evita acidentes, garantindo que você cozinhe com tranquilidade. A tampa de fácil abertura e fechamento torna o uso diário prático e sem complicações.\n\nAlém disso, a Panela Vortex é compatível com todos os tipos de fogões, incluindo indução, e seu revestimento antiaderente facilita a limpeza após o uso. Explore uma variedade de receitas, desde feijoadas até sobremesas deliciosas, e descubra como o cozimento sob pressão pode transformar sua rotina na cozinha. Com a Panela de Pressão Vortex, cada refeição se torna uma oportunidade de criar experiências memoráveis.',
  //       especificacoes:
  //         'Capacidade: 4,5 litros;\nMaterial: Aço inoxidável;\nTecnologia de cozimento rápido;\nSistema de segurança triplo;\nCompatível com fogões a gás, elétricos e de indução;\nRevestimento antiaderente.',
  //     },
  //     {
  //       name: 'Conjunto de Facas Celestiais',
  //       valor: '120.00',
  //       link: 'https://example.com/facas',
  //       thumb: '/categorias/categoria-cozinha/facas.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'O Conjunto de Facas Celestiais é a ferramenta de precisão que faltava para chefs explorarem o corte e a criatividade na cozinha. Com lâminas de aço inoxidável de alta qualidade, cada faca oferece um corte perfeito, seja para fatiar, picar ou desossar. O design ergonômico das alças garante conforto e controle durante o uso, tornando a preparação de alimentos uma experiência prazerosa e eficiente.\n\nEste conjunto inclui facas essenciais para qualquer cozinheiro, como faca chef, faca de pão e faca de desossa, todas projetadas para atender às suas necessidades culinárias. As lâminas afiadas proporcionam cortes limpos, enquanto o acabamento elegante adiciona um toque de sofisticação à sua cozinha.\n\nAlém de sua funcionalidade, o Conjunto de Facas Celestiais é fácil de manter, sendo compatível com lava-louças e fácil de afiar. Transforme sua experiência culinária e leve suas habilidades para o próximo nível com estas facas de alta performance, que prometem não apenas facilitar seu trabalho, mas também inspirar sua criatividade na cozinha.',
  //       especificacoes:
  //         'Material das lâminas: Aço inoxidável;\nMaterial das alças: Polipropileno;\nInclui: faca chef, faca de pão, faca de desossa;\nDesign ergonômico;\nFácil de limpar e afiar.',
  //     },
  //     {
  //       name: 'Batedeira Harmônica',
  //       valor: '250.00',
  //       link: 'https://example.com/batedeira',
  //       thumb: '/categorias/categoria-cozinha/batedeira.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'A Batedeira Harmônica combina potência e design, permitindo que suas massas ganhem a textura ideal com estilo. Com um motor potente de 800W, ela é capaz de misturar até mesmo as massas mais pesadas, garantindo que você tenha resultados consistentes em todas as suas receitas. Seu design elegante e moderno não só embeleza sua cozinha, mas também oferece funcionalidade excepcional, com um bowl de 4,5 litros que permite preparar porções generosas de uma só vez.\n\nA Batedeira vem equipada com várias velocidades, permitindo que você ajuste a intensidade de acordo com a receita. Seja para bater claras em neve, misturar ingredientes secos ou preparar massas para bolos e pães, você encontrará a configuração perfeita. Além disso, o sistema de proteção contra respingos mantém sua cozinha limpa durante o uso.\n\nOs acessórios inclusos, como batedores para massas leves e pesadas, oferecem versatilidade, tornando-a uma verdadeira aliada na cozinha. A limpeza também é facilitada, já que todas as peças removíveis podem ser lavadas na máquina de lavar louças. Descubra a alegria de cozinhar com a Batedeira Harmônica e transforme suas criações culinárias em verdadeiras obras-primas.',
  //       especificacoes:
  //         'Potência: 800W;\nCapacidade do bowl: 4,5 litros;\nVelocidades: 5;\nAcessórios: batedores para massas leves e pesadas;\nSistema de proteção contra respingos;\nFácil de limpar.',
  //     },
  //     {
  //       name: 'Cafeteira Mística',
  //       valor: '180.00',
  //       link: 'https://example.com/cafeteira',
  //       thumb: '/categorias/categoria-cozinha/cafeteira.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'A Cafeteira Mística torna o café um ritual único, entregando sabor, aroma e uma pitada de magia a cada xícara. Com um design sofisticado e detalhes encantadores, esta cafeteira não é apenas uma ferramenta, mas uma verdadeira obra de arte que transforma sua cozinha em um espaço de encantamento. Seu sistema de preparo inteligente permite que você ajuste a intensidade do seu café, garantindo que cada xícara reflita seu gosto pessoal, seja forte e encorpado ou suave e delicado.\n\nEquiparada com uma jarra de vidro resistente ao calor, a Cafeteira Mística tem a capacidade de preparar até 12 xícaras de café de uma só vez, perfeita para receber amigos e familiares. O filtro reutilizável de aço inoxidável não só é ecológico, mas também proporciona um café mais puro, livre de impurezas e resíduos.\n\nAlém de sua eficiência, a cafeteira é fácil de operar, com um painel intuitivo e iluminação LED que indica quando está pronta para servir. Com o timer programável, você pode acordar todos os dias com o aroma do café fresco, criando um ambiente acolhedor desde a manhã. Desfrute de momentos especiais com a Cafeteira Mística e transforme o simples ato de tomar café em uma experiência mágica.',
  //       especificacoes:
  //         'Capacidade: 12 xícaras;\nMaterial: Vidro e aço inoxidável;\nFiltro: reutilizável;\nTimer programável;\nIluminação LED;\nSistema de preparo ajustável.',
  //     },
  //     {
  //       name: 'Sofá Sonhador',
  //       valor: '1200.00',
  //       link: 'https://example.com/sofa',
  //       thumb: '/categorias/categoria-saladeestar/sofa.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Conforto e elegância se encontram no Sofá Sonhador, o espaço perfeito para relaxar e recarregar as energias. Com um design contemporâneo e estofamento acolhedor, este sofá é ideal para criar um ambiente aconchegante em sua sala de estar. Seu tecido de alta qualidade é suave ao toque, enquanto a estrutura robusta garante durabilidade e resistência ao uso diário.\n\nO Sofá Sonhador possui assentos amplos que proporcionam conforto extra, perfeitos para longas maratonas de filmes ou momentos de descanso com um bom livro. As almofadas de encosto são projetadas para oferecer suporte ideal, permitindo que você se acomode sem esforço. Disponível em diversas cores e acabamentos, você pode escolher o que melhor se adapta ao seu estilo e à sua decoração.\n\nAlém de sua beleza estética, o sofá é fácil de manter, com capas removíveis que podem ser lavadas, garantindo que seu espaço esteja sempre limpo e fresco. Transforme sua sala de estar em um verdadeiro refúgio de tranquilidade e estilo com o Sofá Sonhador, onde cada momento se torna uma experiência inesquecível.',
  //       especificacoes:
  //         'Dimensões: 2,2m de largura x 0,9m de profundidade;\nMaterial: Estrutura em madeira de reflorestamento;\nEstofamento: Espuma de alta densidade;\nCores disponíveis: Várias opções;\nCapa removível para fácil limpeza.',
  //     },
  //     {
  //       name: 'Televisão Enigmática',
  //       valor: '2500.00',
  //       link: 'https://example.com/tv',
  //       thumb: '/categorias/categoria-saladeestar/televisão.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Com imagens imersivas, a Televisão Enigmática transforma o entretenimento em uma experiência verdadeiramente fascinante. Equipado com tecnologia de ponta, este modelo 4K Ultra HD oferece uma qualidade de imagem impressionante, com cores vibrantes e detalhes nítidos que fazem cada cena ganhar vida. Seja assistindo a filmes, séries ou eventos esportivos, a Televisão Enigmática proporciona uma clareza visual que cativa os espectadores.\n\nAlém da qualidade de imagem, ela conta com recursos inteligentes, permitindo acesso a uma variedade de aplicativos de streaming, jogos e redes sociais, tudo ao alcance de um clique. O design elegante e minimalista da tela, quase sem bordas, se integra perfeitamente a qualquer decoração, tornando-se um verdadeiro destaque em sua sala de estar.\n\nCom som envolvente e recursos de conexão sem fio, como Bluetooth e Wi-Fi, você pode facilmente conectar dispositivos e desfrutar de suas playlists favoritas com qualidade de áudio excepcional. A Televisão Enigmática não é apenas um aparelho, mas uma porta de entrada para um mundo de entretenimento e diversão que transforma a maneira como você se relaciona com o audiovisual.',
  //       especificacoes:
  //         'Tamanho da tela: 65 polegadas;\nResolução: 4K Ultra HD;\nTecnologia: LED;\nConectividade: Wi-Fi e Bluetooth;\nRecursos: Smart TV com acesso a aplicativos.',
  //     },
  //     {
  //       name: 'Estante de Ideias',
  //       valor: '700.00',
  //       link: 'https://example.com/estante',
  //       thumb: '/categorias/categoria-saladeestar/estante.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Organize seu ambiente e exponha suas melhores ideias com a Estante de Ideias, elegante e funcional para qualquer espaço. Com um design contemporâneo, esta estante oferece não apenas armazenamento, mas também um toque de estilo à sua sala de estar. Feita em madeira de alta qualidade, ela combina resistência e beleza, tornando-se um verdadeiro destaque na decoração do ambiente.\n\nA Estante de Ideias possui prateleiras ajustáveis, permitindo que você personalize a altura de acordo com seus livros, objetos decorativos e plantas, criando um espaço único e acolhedor. Seu acabamento suave e elegante se adapta a diferentes estilos de decoração, desde o clássico ao minimalista.\n\nAlém de ser prática, essa estante estimula a criatividade, incentivando você a exibir suas obras de arte, fotografias e lembranças de viagens, trazendo vida ao seu espaço. Com facilidade de montagem e manutenção, a Estante de Ideias é perfeita para quem busca funcionalidade sem abrir mão da estética. Transforme sua sala de estar em um local inspirador e organizado com essa peça incrível.',
  //       especificacoes:
  //         'Dimensões: 1,8m de altura x 1,2m de largura x 0,4m de profundidade;\nMaterial: Madeira maciça;\nAcabamento: Fosco;\nPrateleiras ajustáveis: Sim;\nMontagem: Fácil, com manual inclusivo.',
  //     },
  //     {
  //       name: 'Piverstation Espacial',
  //       valor: '3500.00',
  //       link: 'https://example.com/tapete',
  //       thumb: '/categorias/categoria-saladeestar/piverstation.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Uma peça futurista para tornar qualquer espaço mais funcional e moderno. Desbrave o universo com o Piverstation Espacial. Este tapete inovador não é apenas um item decorativo, mas uma verdadeira experiência sensorial que transforma o ambiente. Com um design inspirado em galáxias e elementos cósmicos, ele cria uma atmosfera única e envolvente, perfeita para os amantes da ciência e ficção.\n\nFeito com materiais de alta qualidade, o Piverstation Espacial é resistente e fácil de limpar, ideal para áreas de alto tráfego. Seu toque suave proporciona conforto aos pés, tornando-o ideal para momentos de relaxamento em casa, seja assistindo a um filme ou jogando seus games favoritos. Além disso, a tecnologia de impressão utilizada garante cores vibrantes e detalhes nítidos, que não desbotam com o tempo.\n\nA versatilidade do Piverstation Espacial permite que ele se encaixe perfeitamente em diversos estilos de decoração, desde salas de estar modernas até quartos infantis com temática espacial. Crie um espaço convidativo e inspire a imaginação de todos que passarem por ele. Com o Piverstation Espacial, cada dia se torna uma nova aventura pelo cosmos.',
  //       especificacoes:
  //         'Dimensões: 2m x 1,5m;\nMaterial: Poliéster resistente;\nAntiderrapante: Sim;\nLavável: Sim, em máquina;\nDesign: Estampa temática espacial.',
  //     },
  //     {
  //       name: 'Luminária dos Sonhos',
  //       valor: '150.00',
  //       link: 'https://example.com/luminaria',
  //       thumb: '/categorias/categoria-saladeestar/luminaria.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Ilumine seus ambientes com a Luminária dos Sonhos e crie uma atmosfera acolhedora e inspiradora. Este objeto de decoração não é apenas uma fonte de luz, mas um verdadeiro elemento transformador que agrega estilo e personalidade ao seu espaço. Com um design elegante e contemporâneo, a Luminária dos Sonhos se destaca pela sua capacidade de harmonizar qualquer ambiente, desde salas de estar até escritórios e quartos.\n\nA luminária conta com tecnologia LED, proporcionando uma iluminação suave e eficiente que pode ser ajustada de acordo com suas necessidades. Seja para um jantar romântico, uma leitura tranquila ou uma noite de filmes, você pode escolher a intensidade da luz para criar o clima perfeito. Seu formato orgânico e delicado, combinado com acabamentos de alta qualidade, faz dela uma peça central em sua decoração.\n\nAlém de sua beleza estética, a Luminária dos Sonhos é também uma escolha sustentável, com baixo consumo de energia e uma longa vida útil. Com um design que se integra perfeitamente em diversos estilos, ela se torna um complemento ideal para qualquer espaço. Deixe a Luminária dos Sonhos iluminar suas noites e tornar cada momento mais especial.',
  //       especificacoes:
  //         'Dimensões: 30cm de altura x 20cm de diâmetro;\nMaterial: Metal e vidro;\nFonte de luz: LED;\nCor da luz: Branca quente;\nAjuste de intensidade: Sim.',
  //     },
  //     {
  //       name: 'Quadro do Destino',
  //       valor: '300.00',
  //       link: 'https://example.com/quadro',
  //       thumb: '/categorias/categoria-saladeestar/quadro.jpg',
  //       categoria: 'Sala de Estar',
  //       descricao:
  //         'Com o Quadro Decorativo do Destino, seu ambiente ganha uma peça única, cheia de personalidade e significado. Este quadro é mais do que uma simples obra de arte; é uma janela para mundos de possibilidades e reflexões profundas. Com uma mistura vibrante de cores e formas, ele se destaca em qualquer parede, trazendo um toque de criatividade e estilo ao seu espaço.\n\nA impressão de alta qualidade e os materiais duráveis garantem que esta peça mantenha sua beleza ao longo do tempo, resistindo ao desbotamento e ao desgaste. Perfeito para quem aprecia a arte e deseja expressar sua individualidade, o Quadro Decorativo do Destino é ideal para salas de estar, escritórios ou até mesmo corredores, onde pode instigar conversas e inspirações.\n\nCada detalhe do quadro foi cuidadosamente pensado para transmitir mensagens de esperança e determinação, fazendo com que ele ressoe com as emoções de quem o observa. Além disso, sua versatilidade permite que ele combine com diversos estilos de decoração, desde o contemporâneo ao rústico, sempre agregando valor estético ao ambiente. Transforme suas paredes e deixe sua marca com esta obra única, que convida a sonhar e refletir.',
  //       especificacoes:
  //         'Dimensões: 60cm x 90cm;\nMaterial: Canvas com moldura;\nEstilo: Moderno;\nMontagem: Inclui suporte para parede;\nTipo de impressão: Alta definição.',
  //     },
  //     {
  //       name: 'Chuveiro Cósmico',
  //       valor: '400.00',
  //       link: 'https://example.com/chuveiro',
  //       thumb: '/categorias/categoria-banheiro/chuveiro.jpg',
  //       categoria: 'Banheiro',
  //       descricao:
  //         'Renove suas energias sob o Chuveiro Cósmico, onde cada banho é uma experiência refrescante e revigorante. Este chuveiro não é apenas um item funcional, mas uma verdadeira obra de arte que transforma o seu banheiro em um espaço de relaxamento e rejuvenescimento. Com um design moderno e futurista, o Chuveiro Cósmico apresenta linhas elegantes que se integram perfeitamente a qualquer estilo de decoração, desde o minimalista até o mais luxuoso.\n\nEquipado com tecnologia de ponta, ele proporciona diferentes modos de jato, permitindo que você personalize sua experiência de banho. Seja um jato suave para momentos de tranquilidade ou um jato potente para revitalizar o corpo, este chuveiro atende a todas as suas necessidades. Seu sistema de economia de água garante eficiência sem comprometer o conforto, tornando-o uma escolha sustentável para sua casa.\n\nAlém disso, a instalação é simples e rápida, adaptando-se facilmente a qualquer configuração de banheiro. Com o Chuveiro Cósmico, você não apenas cuida do seu bem-estar, mas também adiciona um toque de sofisticação ao seu espaço pessoal. Experimente a sensação de um banho de estrelas e transforme seu dia a dia em uma experiência celestial.',
  //       especificacoes:
  //         'Dimensões: 25cm de largura x 30cm de altura;\nMaterial: Aço inoxidável;\nModos de jato: 3 tipos;\nInstalação: Fácil, compatível com a maioria dos encanamentos;\nEconomia de água: Sim.',
  //     },
  //     {
  //       name: 'Pia de Banheiro Líquida',
  //       valor: '250.00',
  //       link: 'https://example.com/pia',
  //       thumb: '/categorias/categoria-banheiro/pia de banheiro.jpg',
  //       categoria: 'Banheiro',
  //       descricao:
  //         'Elegância e funcionalidade se encontram na Pia Líquida, perfeita para compor um ambiente moderno e sofisticado. Este item é mais do que apenas uma pia; é um verdadeiro statement de estilo que transforma seu banheiro em um refúgio de beleza e praticidade. Com um design fluido e contemporâneo, a Pia Líquida se adapta perfeitamente a diferentes estilos de decoração, desde o minimalista até o industrial.\n\nFeita com materiais de alta qualidade, sua superfície é resistente a manchas e fácil de limpar, garantindo durabilidade e manutenção prática. O espaço de armazenamento inteligente permite organizar produtos de higiene e beleza de forma acessível e estética, enquanto a bacia profunda proporciona conforto durante o uso. A instalação é simples, podendo ser feita em diversos tipos de bancadas, o que a torna uma escolha versátil para qualquer projeto de renovação.\n\nA Pia de Banheiro Líquida não apenas atende às necessidades funcionais do dia a dia, mas também eleva a estética do ambiente, criando uma atmosfera acolhedora e convidativa. Experimente a combinação perfeita de design e utilidade, e transforme seu banheiro em um espaço que reflete sua personalidade.',
  //       especificacoes:
  //         'Dimensões: 50cm x 40cm;\nMaterial: Cerâmica de alta qualidade;\nAcabamento: Brilhante;\nTipo de instalação: Sobrepor ou embutir;\nCompatível com torneiras padrão.',
  //     },
  //     {
  //       name: 'Suporte de Sabão Fluido',
  //       valor: '50.00',
  //       link: 'https://example.com/suporte',
  //       thumb: '/categorias/categoria-banheiro/suporte de sabão.jpg',
  //       categoria: 'Banheiro',
  //       descricao:
  //         'Organize seu banheiro com o Suporte de Sabão Fluido, um toque de simplicidade que faz toda a diferença. Este suporte é a solução perfeita para quem busca praticidade e estilo em um só item. Com um design clean e moderno, ele se encaixa perfeitamente em qualquer espaço, contribuindo para a harmonia da decoração do seu banheiro.\n\nFeito de materiais resistentes e duráveis, o Suporte de Sabão Fluido é projetado para suportar o uso diário, mantendo sua funcionalidade e aparência ao longo do tempo. Sua instalação é rápida e fácil, permitindo que você aproveite os benefícios de um ambiente organizado sem complicações. Além disso, ele é compatível com diferentes formatos de frascos de sabão, garantindo versatilidade e conveniência.\n\nCom este suporte, você não apenas mantém seu espaço livre de bagunça, mas também acrescenta um elemento de design que reflete sua atenção aos detalhes. O Suporte de Sabão Fluido é ideal para quem valoriza a praticidade e o estilo, tornando seu banheiro um lugar mais agradável e eficiente.',
  //       especificacoes:
  //         'Dimensões: 10cm x 15cm;\nMaterial: Plástico resistente;\nCor: Transparente;\nInstalação: Fixa na parede com adesivo ou parafusos;\nCompatível com frascos de sabão líquidos padrão.',
  //     },
  //     {
  //       name: 'Vaso Sanitário do Amanhã',
  //       valor: '600.00',
  //       link: 'https://example.com/vaso',
  //       thumb: '/categorias/categoria-banheiro/Vaso sanitario.jpg',
  //       categoria: 'Banheiro',
  //       descricao:
  //         'O Vaso Sanitário do Amanhã une tecnologia e conforto, projetado para uma experiência incomparável. Com um design inovador que combina estética e funcionalidade, este vaso é a escolha perfeita para quem busca modernidade em seu banheiro. Ele não só eleva a decoração do ambiente, mas também oferece recursos que transformam o ato cotidiano em um momento de prazer e bem-estar.\n\nEquipado com tecnologia de descarga inteligente, o Vaso Sanitário do Amanhã garante economia de água sem comprometer a eficiência, promovendo um uso sustentável. Seu sistema de limpeza avançado minimiza a necessidade de manutenção e proporciona uma higienização completa, deixando o vaso sempre impecável. Além disso, a instalação é simples e rápida, adaptando-se a diferentes tipos de encanamentos com facilidade.\n\nAconchegante e ergonômico, o vaso foi projetado pensando no conforto do usuário, tornando-se um espaço de tranquilidade e bem-estar. Experimente a combinação perfeita de design contemporâneo e tecnologia de ponta, e transforme seu banheiro em um verdadeiro refúgio moderno.',
  //       especificacoes:
  //         'Dimensões: 70cm de altura x 40cm de largura;\nMaterial: Porcelana;\nTipo de descarga: Dupla;\nInstalação: Solo;\nAcompanha: Assento com fechamento suave.',
  //     },
  //     {
  //       name: 'Armário de Cozinha Visionário',
  //       valor: '800.00',
  //       link: 'https://example.com/armario',
  //       thumb: '/categorias/categoria-cozinha/Armario de Cozinha.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'Com o Armário Visionário, sua cozinha se torna um espaço organizado e cheio de estilo. Este armário foi projetado para atender às necessidades de quem busca funcionalidade e estética em um só produto. Seus compartimentos amplos e prateleiras ajustáveis permitem que você maximize o espaço disponível, facilitando a organização de utensílios, panelas e alimentos.\n\nFeito com materiais de alta qualidade, o Armário de Cozinha Visionário oferece durabilidade e resistência, além de um acabamento que traz sofisticação ao ambiente. O design contemporâneo se adapta a diferentes estilos de cozinha, desde os mais tradicionais aos mais modernos, garantindo que ele seja uma peça central na sua decoração.\n\nA instalação é prática e rápida, e as portas são equipadas com fechaduras suaves, permitindo um uso silencioso e confortável. Seja para armazenar suas receitas favoritas ou para exibir itens decorativos, este armário transforma a experiência na cozinha, tornando-a mais agradável e organizada. Descubra como a funcionalidade e o design podem andar lado a lado em seu espaço culinário.',
  //       especificacoes:
  //         'Dimensões: 180cm de altura x 80cm de largura x 50cm de profundidade;\nMaterial: MDF com revestimento melamínico;\nCor: Branco com detalhes em madeira;\nNúmero de prateleiras: 4;\nAcompanha: Instruções para montagem.',
  //     },
  //     {
  //       name: 'Fogão do Futuro',
  //       valor: '1200.00',
  //       link: 'https://example.com/fogao',
  //       thumb: '/categorias/categoria-cozinha/fogão.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'O Fogão do Futuro leva a tecnologia para sua cozinha, com design e eficiência em cada prato. Equipado com as mais recentes inovações, este fogão não apenas acelera o preparo das suas refeições, mas também otimiza o uso de energia, tornando-se uma escolha sustentável para o seu dia a dia.\n\nSua interface digital intuitiva permite um controle preciso da temperatura e do tempo de cozimento, garantindo resultados perfeitos a cada utilização. O design moderno e elegante se encaixa perfeitamente em qualquer estilo de cozinha, tornando-se uma peça de destaque no ambiente.\n\nCom funcionalidades como programação de receitas e painel touch, o Fogão do Futuro traz comodidade e praticidade para o seu cotidiano, enquanto o sistema de segurança integrado proporciona tranquilidade durante o uso. Desde pratos simples até as receitas mais elaboradas, você poderá explorar um universo de sabores e texturas com facilidade e estilo. Transforme sua experiência culinária e descubra um novo padrão de eficiência na cozinha.',
  //       especificacoes:
  //         'Dimensões: 90cm de altura x 60cm de largura x 60cm de profundidade;\nMaterial: Aço inoxidável;\nTipo de gás: GLP;\nNúmero de bocas: 5;\nAcompanha: Manual do usuário.',
  //     },
  //     {
  //       name: 'Mesa de Jantar Estelar',
  //       valor: '900.00',
  //       link: 'https://example.com/mesa',
  //       thumb: '/categorias/categoria-cozinha/Mesa de Jantar.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'A Mesa de Jantar Estelar é o cenário ideal para encontros e refeições memoráveis com família e amigos. Com um design elegante e sofisticado, ela se destaca como o coração do seu espaço de refeições, promovendo a conexão e o convívio entre aqueles que a cercam.\n\nFabricada com materiais de alta qualidade, a mesa combina resistência e beleza, garantindo que sua durabilidade acompanhe a sua história familiar. Suas linhas modernas e acabamentos refinados se adaptam a diversos estilos de decoração, seja contemporânea, rústica ou minimalista.\n\nEspaçosa o suficiente para acomodar confortavelmente todos os convidados, a Mesa de Jantar Estelar se torna o local perfeito para jantares íntimos ou grandes celebrações. Além disso, sua superfície fácil de limpar permite que você desfrute de cada refeição sem preocupações. Transforme suas refeições em momentos especiais e crie memórias inesquecíveis em torno dessa mesa maravilhosa.',
  //       especificacoes:
  //         'Dimensões: 75cm de altura x 180cm de comprimento x 90cm de largura;\nMaterial: Madeira de reflorestamento com acabamento em verniz;\nNúmero de lugares: 6;\nCor: Carvalho claro;\nAcompanha: Manual de montagem.',
  //     },
  //     {
  //       name: 'Microondas da Galáxia',
  //       valor: '500.00',
  //       link: 'https://example.com/microondas',
  //       thumb: '/categorias/categoria-cozinha/Microondas.jpg',
  //       categoria: 'Cozinha',
  //       descricao:
  //         'Praticidade e inovação em um só produto. O Microondas da Galáxia é seu aliado na hora de aquecer e cozinhar. Com um design futurista e funcional, ele se destaca não apenas pela estética, mas também por suas características avançadas que tornam a cozinha mais eficiente e divertida.\n\nEquipado com diversas funções pré-programadas, você pode facilmente preparar uma variedade de pratos com apenas um toque. Sua tecnologia de aquecimento uniforme garante que cada refeição seja aquecida por igual, eliminando pontos frios e proporcionando uma experiência gastronômica de qualidade.\n\nAlém disso, a função descongelar é rápida e eficaz, permitindo que você prepare refeições em um tempo recorde. O Microondas da Galáxia também conta com um painel digital intuitivo, facilitando o uso diário e oferecendo segurança, com bloqueio para crianças. Transforme sua rotina na cozinha e aproveite a praticidade que esse microondas oferece, tornando suas refeições mais rápidas e saborosas.',
  //       especificacoes:
  //         'Dimensões: 30cm de altura x 50cm de largura x 40cm de profundidade;\nCapacidade: 30 litros;\nPotência: 1000W;\nFunções: Aquecer, cozinhar, descongelar, grelhar;\nCor: Prata com acabamento em vidro.',
  //     },
  //     {
  //       name: 'Cadeira Moderna do Destino',
  //       valor: '350.00',
  //       link: 'https://example.com/cadeira',
  //       thumb: '/categorias/categoria-quarto/Cadeira moderna.jpg',
  //       categoria: 'Quarto',
  //       descricao:
  //         'A Cadeira Moderna do Destino traz conforto e elegância para seu espaço de trabalho ou estudo. Com um design contemporâneo, ela combina estética e funcionalidade, sendo perfeita para quem passa longas horas sentado. Sua estrutura ergonômica proporciona um suporte adequado para a coluna, evitando desconfortos e promovendo uma boa postura.\n\nOs materiais de alta qualidade utilizados na confecção garantem durabilidade e resistência, enquanto o acabamento em tecido suave proporciona um toque acolhedor. Disponível em várias cores, esta cadeira se adapta facilmente a diferentes decorações, tornando-se uma peça chave no seu ambiente.\n\nAlém disso, a Cadeira Moderna do Destino possui ajuste de altura e rodízios, permitindo fácil mobilidade e personalização para o seu conforto. Seja para trabalho, estudo ou leitura, esta cadeira se torna a companheira ideal, unindo estilo e praticidade.',
  //       especificacoes:
  //         'Dimensões: 90cm de altura x 60cm de largura x 60cm de profundidade;\nPeso suportado: até 120kg;\nMaterial: Estrutura em metal, assento em espuma revestido em tecido;\nAjuste de altura: Sim;\nRodízios: Sim.',
  //     },
  //     {
  //       name: 'Cama dos Sonhos',
  //       valor: '1200.00',
  //       link: 'https://example.com/cama',
  //       thumb: '/categorias/categoria-quarto/Cama.jpg',
  //       categoria: 'Quarto',
  //       descricao:
  //         'Para noites perfeitas, a Cama dos Sonhos oferece o suporte e conforto que você merece para um sono revigorante. Com um design elegante e moderno, esta cama transforma seu quarto em um refúgio de tranquilidade. Sua estrutura robusta proporciona estabilidade e segurança, enquanto o colchão de alta qualidade garante a suavidade e o suporte ideais para um descanso profundo.\n\nFeita com materiais que respiram, a Cama dos Sonhos mantém a temperatura agradável durante toda a noite, prevenindo desconfortos causados pelo calor ou umidade. O estofamento em tecido de luxo não apenas adiciona um toque sofisticado, mas também é fácil de limpar e manter.\n\nAlém disso, a Cama dos Sonhos é projetada para atender a diferentes estilos de decoração, com opções de cores e acabamentos que combinam com qualquer ambiente. Se você busca um lugar para relaxar após um longo dia ou um espaço aconchegante para leitura, esta cama é a escolha perfeita.',
  //       especificacoes:
  //         'Dimensões: 200cm de comprimento x 160cm de largura x 100cm de altura;\nMaterial: Estrutura em madeira, colchão em espuma;\nPeso suportado: até 300kg;\nDisponível em várias cores: Branco, Cinza, Preto;\nMontagem: Necessária.',
  //     },
  //     {
  //       name: 'Computador Intergaláctico',
  //       valor: '3000.00',
  //       link: 'https://example.com/computador',
  //       thumb: '/categorias/categoria-quarto/Computador.jpg',
  //       categoria: 'Quarto',
  //       descricao:
  //         'Potência e desempenho incomparáveis com o Computador Intergaláctico, para levar você além dos limites digitais. Equipado com a mais recente tecnologia em hardware, este computador oferece um processamento ultra-rápido, ideal para gamers, criadores de conteúdo e profissionais que buscam o melhor em performance. Com uma placa de vídeo de última geração, suas experiências de jogo e edição de vídeo serão elevadas a um novo patamar.\n\nO design futurista do Computador Intergaláctico não apenas impressiona, mas também garante um ótimo fluxo de ar, mantendo seus componentes em temperaturas ideais durante longas sessões de uso. A iluminação LED personalizável permite que você crie um ambiente que combine com seu estilo pessoal.\n\nCom um sistema operacional otimizado, você terá acesso a recursos avançados, segurança aprimorada e uma interface intuitiva, tornando sua experiência ainda mais agradável. Se você deseja um computador que não apenas funcione, mas que também inspire, o Computador Intergaláctico é a escolha perfeita para você.',
  //       especificacoes:
  //         'Processador: AMD i9 Europeu do mexico;\nMemória RAM: 320ZB;\nArmazenamento: SSD de 200YB + HD de 2YB;\nPlaca de vídeo: NVIDIA GeForça da Trembolona RTX 308000;\nConexões: USB-C, HDMI, Ethernet;\nSistema Operacional: WindowsUbunto XT.',
  //     },
  //     {
  //       name: 'Guarda Roupa Místico',
  //       valor: '1000.00',
  //       link: 'https://example.com/guarda',
  //       thumb: '/categorias/categoria-quarto/Guada roupa.jpg',
  //       categoria: 'Quarto',
  //       descricao:
  //         'Organize seus pertences com estilo e mistério no Guarda Roupa Místico, projetado para guardar sonhos e segredos. Este guarda-roupa é mais do que um simples móvel; ele se torna uma peça central do seu quarto, trazendo um toque de elegância e sofisticação. Com amplo espaço interno, ele é ideal para armazenar roupas, calçados e acessórios de forma prática e acessível.\n\nAs prateleiras ajustáveis permitem que você personalize o espaço conforme suas necessidades, enquanto os cabideiros robustos garantem que suas roupas fiquem sempre bem organizadas e sem amassados. O acabamento em madeira de alta qualidade proporciona durabilidade e um aspecto luxuoso, fazendo do Guarda Roupa Místico uma escolha perfeita para qualquer ambiente.\n\nCom detalhes decorativos que evocam um ar de mistério, este guarda-roupa transforma seu quarto em um refúgio pessoal. Além disso, as portas deslizantes facilitam o acesso, otimizando o espaço disponível. Se você busca funcionalidade sem abrir mão da estética, o Guarda Roupa Místico é a solução ideal.',
  //       especificacoes:
  //         'Dimensões: 2m x 1,5m x 0,6m;\nMaterial: Madeira de alta qualidade;\nPortas: Deslizantes;\nAcabamento: Fosco ou brilhante;\nCores disponíveis: Carvalho, Branco, Preto.',
  //     },
  //     {
  //       name: 'Carro RapLaren YCence',
  //       valor: '50000.00',
  //       link: 'https://example.com/carro',
  //       thumb: '/categorias/categoria-outros/carro futurista.jpg',
  //       categoria: 'Outros',
  //       descricao:
  //         'Velocidade e inovação se encontram no Carro RapLaren YCence, uma máquina para explorar o futuro. Este veículo é projetado para aqueles que não têm medo de ultrapassar limites e desafiar as normas do automobilismo. Com um design aerodinâmico que não apenas impressiona, mas também otimiza a performance, o RapLaren YCence é uma verdadeira obra-prima da engenharia moderna.\n\nEquipado com tecnologia de ponta, seu motor potente oferece aceleração explosiva, tornando cada viagem uma experiência emocionante. Os sistemas de assistência ao motorista garantem segurança e conforto, permitindo que você desfrute da estrada com confiança.\n\nO interior do carro é luxuosamente equipado, com materiais de alta qualidade e tecnologia intuitiva. O painel de controle digital e as opções de personalização criam um ambiente que reflete sua personalidade e estilo.\n\nSeja em uma corrida ou em um passeio pela cidade, o Carro RapLaren YCence é mais do que um meio de transporte; é uma declaração de intenções, ideal para aqueles que buscam velocidade, conforto e inovação.',
  //       especificacoes:
  //         'Dimensões: 4,5m x 2m x 1,2m;\nMotor: V8, 650 hp;\nTransmissão: Automática de 200 velocidades;\nAceleração: 0-900 km/ms em 1 segundo;\nTecnologia: Sistema de navegação integrado, conectividade Bluetooth.',
  //     },
  //     {
  //       name: 'Celular da Nova Era',
  //       valor: '2000.00',
  //       link: 'https://example.com/celular',
  //       thumb: '/categorias/categoria-outros/celular.jpg',
  //       categoria: 'Outros',
  //       descricao:
  //         'Conecte-se ao mundo com o Celular da Nova Era, um dispositivo que combina tecnologia e elegância. Este smartphone foi projetado para atender às demandas da vida moderna, oferecendo desempenho excepcional e funcionalidades inovadoras. Com uma tela AMOLED de alta definição, suas imagens ganham vida com cores vibrantes e detalhes impressionantes.\n\nO Celular da Nova Era é equipado com um processador potente que garante fluidez em todas as tarefas, desde jogos intensos até multitarefas. Sua câmera de última geração captura fotos deslumbrantes, mesmo em condições de baixa luz, permitindo que você registre todos os momentos especiais da sua vida.\n\nAlém disso, o dispositivo possui uma bateria de longa duração, para que você possa aproveitar ao máximo suas funções sem se preocupar em recarregar. O design sofisticado e leve torna o celular confortável de segurar, enquanto sua variedade de opções de cores permite que você escolha um que reflita sua personalidade.\n\nCom recursos como reconhecimento facial e segurança avançada, o Celular da Nova Era é mais do que um telefone; é uma extensão do seu estilo de vida digital.',
  //       especificacoes:
  //         'Tela: 6,7" AMOLED;\nProcessador: Octa-core;\nCâmera: Traseira 100008 MP, Frontal 352 MP;\nArmazenamento: 256 PB;\nBateria: 500000 mAh.',
  //     },
  //     {
  //       name: 'Máquina de Lavar Épica',
  //       valor: '1500.00',
  //       link: 'https://example.com/maquina',
  //       thumb: '/categorias/categoria-outros/maquina de lavar.jpg',
  //       categoria: 'Outros',
  //       descricao:
  //         'A Máquina de Lavar Épica redefine a experiência de lavagem com eficiência e estilo. Projetada para atender às necessidades do dia a dia, esta máquina oferece diversas funções que garantem a limpeza profunda de suas roupas, mantendo-as como novas.\n\nCom um design moderno e intuitivo, é fácil de usar, permitindo que você selecione o ciclo ideal para cada tipo de tecido. Sua tecnologia avançada minimiza o consumo de água e energia, contribuindo para um lar mais sustentável.\n\nO tambor espaçoso comporta grandes cargas, tornando as lavagens mais rápidas e eficientes, enquanto a opção de ciclo rápido oferece resultados em menos tempo. A Máquina de Lavar Épica ainda conta com um painel digital que exibe todas as informações necessárias de forma clara e acessível.\n\nCom recursos como lavagem a vapor e programas especiais para roupas delicadas, você pode ter a certeza de que suas peças estão em boas mãos.',
  //       especificacoes:
  //         'Capacidade: 100 kg;\nCiclos: 15;\nClassificação energética: A+++;\nDimensões: 85 x 60 x 60 cm.',
  //     },
  //     {
  //       name: 'Moto Vortex 3K',
  //       valor: '10000.00',
  //       link: 'https://example.com/moto',
  //       thumb: '/categorias/categoria-outros/moto.jpg',
  //       categoria: 'Outros',
  //       descricao:
  //         'A Moto Vortex 3K é uma obra-prima da engenharia que transforma cada viagem em uma aventura emocionante. Com um design futurista e linhas aerodinâmicas, esta motocicleta não apenas chama a atenção, mas também oferece desempenho excepcional em qualquer terreno.\n\nEquipadas com turbinas de alta performance, ela é capaz de atravessar estradas dimensionais com facilidade, proporcionando uma experiência de pilotagem inigualável. Seu painel digital intuitivo oferece informações em tempo real, garantindo que você esteja sempre no controle.\n\nA Vortex 3K também se destaca pela sua eficiência energética, tornando-a uma escolha inteligente para quem se preocupa com o meio ambiente. Com um sistema de suspensão avançado e freios ABS, você terá segurança e conforto em cada curva.\n\nSeja para uma viagem longa ou um passeio rápido pela cidade, a Moto Vortex 3K é a companheira perfeita para quem busca liberdade e emoção nas estradas.',
  //       especificacoes:
  //         'Motor: Turbina de 900000cc;\nPotência: 200 HP;\nPeso: 180 kg;\nVelocidade máxima: 3050 km/ms;\nConsumo de combustível: 1500 km/l;\nFreios: Sistema Segura na mão de Deus;\nSuspensão: Dianteira invertida e traseira monoamortecida;\nCores disponíveis: Preto Metálico, Vermelho Vivo, Prata Fosco.',
  //     },
  //   ];
  //   list.forEach((product) => {
  //     addDoc(productCollectionRef, {
  //       name: product.name,
  //       valor: product.valor,
  //       link: product.link,
  //       thumb: product.thumb,
  //       categoria: product.categoria,
  //       descricao: product.descricao,
  //       especificoes: product.especificacoes,
  //     });
  //   });
  // }
  function checkCode() {
    if (parameterUtils.destino) {
      if (status === 'forgout') {
        if (codeUser !== parameterUtils.message) {
          setInputError('2px solid red');
          setInfoError('Código incorreto');
        } else if (codeUser === parameterUtils.message) {
          navigate(`/redefinirpass`);
          setCheckSegurity(true);
        }
      } else if (status === 'createuser') {
        createUser();
      }
    }
  }

  return (
    <section className={styles.CodeCheck}>
      <div className={styles.InsertCodeBox}>
        <h1>- Código enviado para seu email! -</h1>
        <h2>Digite o código</h2>
        <p>{infoError}</p>
        <input
          type="text"
          onChange={(e) => setCodeUser(e.target.value)}
          style={{ border: inputError }}
        />
        <button onClick={() => checkCode()}>Confirmar</button>
      </div>
    </section>
  );
}

export default PassCodeVerification;
