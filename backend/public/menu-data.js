// menu-data.js — Maison Kayser (FR/EN) — structure: sections -> categories -> items
// Source: PDF fourni :contentReference[oaicite:1]{index=1}

const menuData = {
    fr: [
        {
            id: "petits-dejeuners",
            title: "Nos Petits-Déjeuners & Brunch",
            categories: [
                {
                    id: "formules",
                    title: "Nos Formules",
                    subtitle:
                        "Disponibles du lundi au vendredi jusqu'à 12H00, le week-end et jours fériés jusqu'à 16H",
                    items: [
                        {
                            name: "Formule Bénédicte",
                            description:
                                "Boisson chaude et froide au choix. Bun brioché et ses œufs pochés servis avec sa sauce hollandaise maison. Au choix : Saumon, Pastrami, Charcuterie, Légumes Grillés. Pain Perdu ou Pancake Caramel Dulce De Leche, son granola maison et sa chantilly.",
                            price: "125 Dh"
                        },
                        {
                            name: "Formule Egg Bun",
                            description:
                                "Boisson chaude et froide au choix. Bun brioché, servi avec les œufs brouillés, et fromage frais. Au choix : Saumon, Pastrami, Charcuterie, Légumes Grillés. Pain Perdu ou Pancake Caramel Dulce De Leche, son granola maison et sa chantilly.",
                            price: "115 Dh"
                        },
                        {
                            name: "Formule Le Continental",
                            description:
                                "Boisson chaude et froide au choix. Omelette avec garniture au choix (Légumes grillés, charcuterie, fromage, champignons ou épinard). Corbeille du boulanger et ses condiments. Salade de fruit de saison à la verveine.",
                            price: "95 Dh"
                        },
                        {
                            name: "Formule Traditionnelle",
                            description:
                                "Boisson chaude et froide au choix. Œufs au khili (bœuf séché) ou Chakchouka et ses oeufs à la feta. Corbeille tradi (msemen, harcha, batbout) et bébé complet. Condiments : jben, miel, huile d'olive, olives marinées. Salade de fruit de saison à la verveine.",
                            price: "105 Dh"
                        },
                        {
                            name: "Formule du Boulanger",
                            description:
                                "Boisson chaude et froide au choix. Corbeille du boulanger (bébé céréale, bébé complet, mini croissant, mini pain au chocolat, mini pain aux raisins) et ses condiments (beurre, confiture et miel). Disponible du lundi au vendredi jusqu'à 11h.",
                            price: "55 Dh"
                        },
                        {
                            name: "Formule Brunch",
                            description:
                                "Boisson chaude et froide au choix. Corbeille du boulanger et condiments. Tartine guacamole saumon œuf poché ou tartine pastrami grillé cream cheese. Salade de fruit, Sunshine Bowl ou chia pudding. Pain Perdu ou Pancake Caramel Dulce De Leche.",
                            price: "150 Dh"
                        }
                    ]
                },
                {
                    id: "oeufs",
                    title: "Nos Œufs Frais à la Carte",
                    subtitle: "Jusqu'à 12H00",
                    items: [
                        { name: "2 Œufs à la coque", price: "35 Dh" },
                        { name: "3 Œufs au plat", price: "35 Dh" },
                        { name: "Omelette nature", price: "40 Dh" },
                        { name: "Omelette aux fines herbes fraîches", price: "40 Dh" },
                        { name: "Omelette au fromage", price: "45 Dh" },
                        { name: "Omelette au jambon de dinde", price: "45 Dh" },
                        { name: "Œufs brouillés à la crème", price: "45 Dh" },
                        { name: "3 Œufs au khlii", price: "50 Dh" },
                        { name: "Omelette aux champignons", price: "50 Dh" },
                        { name: "Omelette soufflée blanche aux épinards", price: "55 Dh" },
                        { name: "Omelette au saumon", price: "65 Dh" }
                    ]
                },
                {
                    id: "all-day",
                    title: "All Day Treat",
                    items: [
                        {
                            name: "2 Œufs Bénédictine",
                            description:
                                "2 tranches de pain de mie japonais, Pastrami de bœuf sur fromage frais ou Saumon gravlax sur lit d'épinards sautés au beurre, sauce Hollandaise.",
                            price: "95 Dh"
                        },
                        {
                            name: "Egg Bun Pastrami ou Saumon",
                            description:
                                "Pain brioché, Œufs pochés, fromage cheddar, fromage frais, pastrami ou Œufs pochés, fromage frais, avocat, saumon gravlax.",
                            price: "85 Dh"
                        },
                        {
                            name: "Tartine Saumon Scandinave",
                            description:
                                "Tourte de meule au levain, guacamole d'avocat, saumon gravlax maison, œuf poché, pickel's d'oignons.",
                            price: "95 Dh"
                        },
                        {
                            name: "Tartine Avocat",
                            description: "Pain de mie japonais, écrasé d'avocat, noisettes, œufs au plat.",
                            price: "75 Dh"
                        },
                        {
                            name: "Croque Madame",
                            description:
                                "Pain de mie japonais, jambon, béchamel, emmental râpé gratiné, œufs au plat.",
                            price: "75 Dh"
                        }
                    ]
                }
            ]
        },

        {
            id: "bistronomique",
            title: "Notre Carte Bistronomique",
            categories: [
                {
                    id: "salades-soupes",
                    title: "Salades et Soupes",
                    items: [
                        { name: "Soupe du Jour", description: "Velouté légume, soupe à l'oignon, soupe thaï.", price: "70 Dh" },
                        {
                            name: "Po'Kayser Bowl",
                            description:
                                "Quinoa, poulet teriyaki, carotte marinée, mangue, tomates cerise, concombre, sauce douce à l'orange.",
                            price: "100 Dh"
                        },
                        {
                            name: "La Niçoise",
                            description:
                                "Riz basmati, mesclun de salade, haricots verts, pomme de terre, poivron rôti, tomates cerises, concombre, rillette de thon, œuf, vinaigrette balsamique, pickel's d'oignon, olives.",
                            price: "85 Dh"
                        },
                        {
                            name: "Le Fondant Avocat aux Gambas",
                            description:
                                "Gambas pochées, suprême d'orange, douceur d'avocat, tomate et concombre, vinaigrette à l'orange.",
                            price: "105 Dh"
                        },
                        {
                            name: "La César Poulet",
                            description:
                                "Salade Romaine, poulet mariné, tomates cerise, anchois marinés, crumble de parmesan, œuf poché, sauce césar maison, chips de pain.",
                            price: "95 Dh"
                        },
                        {
                            name: "La Stracciatella",
                            description:
                                "Crème de burrata, courgette grillées, huile d'olive, chips de pain, sauce pesto, chips de pain.",
                            price: "70 Dh"
                        },
                        {
                            name: "La César Gambas",
                            description:
                                "Salade Romaine, gambas pochés, tomates cerise, anchois frais, crumble de parmesan, sauce césar maison, chips de pain.",
                            price: "120 Dh"
                        }
                    ]
                },
                {
                    id: "tartines",
                    title: "Nos Tartines",
                    subtitle: "Servies avec salade verte",
                    items: [
                        {
                            name: "La Bruschetta",
                            description:
                                "Tourte de meule au levain, poulet, fondue de tomate mozzarella, pesto, olives noires.",
                            price: "85 Dh"
                        },
                        {
                            name: "Tartine Provençale",
                            description:
                                "Tourte de meule au levain, légumes à la provençale, feta, œuf poché, roquette.",
                            price: "85 Dh"
                        },
                        {
                            name: "Tartine Phily Cheesesteak",
                            description:
                                "Tourte de meule au levain, viande hachée, compotée d'oignons, cornichon, sauce cheddar, frites maison.",
                            price: "105 Dh"
                        }
                    ]
                },
                {
                    id: "fougasses",
                    title: "Fougasses",
                    subtitle: "Servies avec salade verte",
                    items: [
                        {
                            name: "Fougasse Méditerranéenne",
                            description: "Légumes grillés, sauce tomate, sauce pesto, stracciatella.",
                            price: "75 Dh"
                        },
                        {
                            name: "Fougasse Provençale",
                            description: "Ratatouille de légumes, filet de thon, sauce pesto et feta.",
                            price: "85 Dh"
                        },
                        {
                            name: "Fougasse Forestière",
                            description: "Poulet, champignons sautés, sauce béchamel, fromage.",
                            price: "80 Dh"
                        }
                    ]
                },
                {
                    id: "sandwichs",
                    title: "Nos Sandwichs",
                    subtitle: "Servis avec frites maison et salade",
                    items: [
                        {
                            name: "Le Pastrami",
                            description:
                                "Ciabatta nature, pastrami maison avec jus de bœuf Maison, moutarde à l'ancienne, cornichon et pickel's d'oignons, sauce cheddar.",
                            price: "105 Dh"
                        },
                        {
                            name: "Klub Sandwich Poulet",
                            description:
                                "Pain Big Mie aux céréales, poulet mariné, œuf dur, emmental, salade, tomate, sauce tartare.",
                            price: "85 Dh"
                        },
                        {
                            name: "Klub Sandwich Thon",
                            description:
                                "Pain Big Mie nature, rillettes de thon aux céleris, œuf dur, concombre et tomate.",
                            price: "85 Dh"
                        },
                        {
                            name: "Le New Yorker",
                            description:
                                "Pain de mie japonais, pastrami, sauce béarnaise, tomate, roquette, coriandre, cornichon et pickel's d'oignon.",
                            price: "105 Dh"
                        },
                        {
                            name: "Burger Classique",
                            description:
                                "Bun Brioché, laitue, steak haché, cheddar, oignon, tomate, cornichons, sauce classique, crispy d'oignon.",
                            price: "95 Dh"
                        },
                        {
                            name: "Burger Mexicano",
                            description:
                                "Bun Brioché, guacamole, poulet mariné tex-mex, tomate, roquette, sauce paprika fumé.",
                            price: "85 Dh"
                        }
                    ]
                }
            ]
        },

        {
            id: "plats",
            title: "Nos Plats",
            categories: [
                {
                    id: "viandes",
                    title: "Nos Viandes",
                    subtitle:
                        "Servies avec frites maison, salade et sauce au choix (champignon, moutarde à l'ancienne, béarnaise)",
                    items: [
                        {
                            name: "Filet de Bœuf",
                            description: "Grillé servi avec sa salade et ses frites maison.",
                            price: "185 Dh"
                        },
                        {
                            name: "Cuisse de Poulet Rôti",
                            description: "Poulet rôti servi avec jus corsé et purée maison et salade.",
                            price: "105 Dh"
                        },
                        { name: "Supplément accompagnement", description: "Purée mousseline / frites maison / légumes sautés / riz basmati.", price: "25 Dh" },
                        { name: "Supplément sauce", description: "Sauce champignons / sauce béarnaise / sauce moutarde à l’ancienne.", price: "25 Dh" }
                    ]
                },
                {
                    id: "poissons",
                    title: "Nos Poissons",
                    subtitle: "Servi avec riz basmati",
                    items: [
                        {
                            name: "Pavé de Saumon",
                            description: "Pavé de saumon, sauce teriyaki, légumes sautés.",
                            price: "170 Dh"
                        }
                    ]
                },
                {
                    id: "pates",
                    title: "Nos Pâtes",
                    items: [
                        {
                            name: "Tagliatelles Forestière",
                            description: "Poulet sauté et sa sauce crémeuse aux champignons.",
                            price: "105 Dh"
                        },
                        {
                            name: "Tagliatelles aux 2 Saumons",
                            description: "Saumon frais et gravelax, épinards.",
                            price: "110 Dh"
                        },
                        {
                            name: "Pennes Crudaïola",
                            description:
                                "Coulis de tomates, ratatouille, rillettes de thon et feta servis avec une sauce vierge de légumes.",
                            price: "110 Dh"
                        },
                        {
                            name: "Spaghetti Bolognaise",
                            description: "Sauce mijotée au bœuf, tomate et aromates.",
                            price: "120 Dh"
                        }
                    ]
                }
            ]
        },

        {
            id: "desserts",
            title: "Nos Desserts",
            categories: [
                {
                    id: "desserts-list",
                    title: "Douceurs Sucrées",
                    items: [
                        {
                            name: "Chia Pudding",
                            description: "Au lait de coco, coulis de fruits rouges, fruits et granola maison",
                            price: "55 Dh"
                        },
                        {
                            name: "Sunshine Bowl",
                            description: "Bol de fromage blanc, miel, fruits et granola maison",
                            price: "60 Dh"
                        },
                        { name: "Salade de Fruit de Saison à la Verveine", price: "45 Dh" },
                        {
                            name: "Pain Perdu",
                            description:
                                "Brioche toastée, coulis de fruits rouges ou sauce chocolat ou caramel, sauce dulce de leche et sa boule de glace vanille.",
                            price: "65 Dh"
                        },
                        {
                            name: "Pancake",
                            description:
                                "Pancake, coulis de fruits ou sauce chocolat ou caramel, chantilly, sauce dulce de leche et sa boule de glace vanille.",
                            price: "65 Dh"
                        },
                        {
                            name: "Sébastian et ses Sauces au Choix",
                            description: "Sauce caramel dulce de leche, sauce au chocolat, sauce pistache.",
                            price: "55 Dh"
                        },
                        {
                            name: "Cookie 3 Chocolats",
                            description: "Servi à la poêle, et sa boule de crème glacée à la vanille.",
                            price: "65 Dh"
                        },
                        {
                            name: "Crêpes Kunafa",
                            description: "Sauce chocolat, kunafa pistaches, et sa boule de crème glacée à la vanille.",
                            price: "65 Dh"
                        },
                        {
                            name: "Fondant Chocolat",
                            description: "Avec sa boule de crème glacée à la vanille.",
                            price: "55 Dh"
                        },
                        {
                            name: "Crêpes à l'Orange / au Chocolat / Caramel Dulce de Leche",
                            description: "Et boule de crème glacée à la vanille.",
                            price: "55 Dh"
                        }
                    ]
                }
            ]
        },

        {
            id: "boissons",
            title: "Nos Boissons",
            categories: [
                {
                    id: "cafes",
                    title: "Nos Cafés",
                    items: [
                        { name: "Espresso", price: "27 Dh" },
                        { name: "Double Espresso", price: "50 Dh" },
                        { name: "Café noisette", price: "27 Dh" },
                        { name: "Café américain", price: "27 Dh" },
                        { name: "Café allongé", price: "27 Dh" },
                        { name: "Cortado / Noss Noss", price: "29 Dh" },
                        { name: "Flat White", price: "33 Dh" },
                        { name: "Grand crème", price: "33 Dh" },
                        { name: "Cappuccino", price: "37 Dh" },
                        { name: "Espresso macchiato", price: "29 Dh" },
                        { name: "Café mocha viennois", price: "48 Dh" },
                        { name: "Café mocha tradi", price: "42 Dh" }
                    ]
                },
                {
                    id: "chocolats",
                    title: "Nos Chocolats",
                    items: [
                        { name: "Chocolat chaud à l’ancienne", price: "45 Dh" },
                        { name: "Chocolat chaud", price: "39 Dh" },
                        { name: "Chocolat viennois", price: "50 Dh" }
                    ]
                },
                {
                    id: "thes",
                    title: "Thés et Infusions",
                    items: [
                        { name: "Thé marocain", price: "27 Dh" },
                        { name: "Thés et infusions", price: "45 Dh" }
                    ]
                },
                {
                    id: "lattes",
                    title: "Nos Lattes",
                    items: [
                        { name: "Latte Macchiato", description: "Caramel, ou noisette ou vanille", price: "45 Dh" },
                        { name: "Latte Kayser", description: "Madeleine ou cookies ou pains d’épices", price: "55 Dh" },
                        { name: "Chai Latte", price: "45 Dh" },
                        { name: "Golden Latte", price: "55 Dh" },
                        { name: "Matcha Latte", price: "55 Dh" },
                        { name: "Lait végétal", description: "En supplément", price: "10 Dh" },
                        { name: "Lait chaud", price: "15 Dh" },
                        { name: "Chantilly", price: "12 Dh" }
                    ]
                },
                {
                    id: "cafes-glaces",
                    title: "Nos Cafés Glacés",
                    items: [
                        { name: "Le Frappé", description: "Vanille, café", price: "49 Dh" },
                        { name: "Afogatto", description: "Boule de glace vanille", price: "49 Dh" }
                    ]
                },
                {
                    id: "thes-glaces",
                    title: "Nos Thés Glacés",
                    items: [
                        { name: "La Pêche", description: "Thé vert, sirop de pêche", price: "39 Dh" },
                        { name: "Le Booster", description: "Thé vert, gingembre, citron, hibiscus", price: "39 Dh" }
                    ]
                },
                {
                    id: "milkshakes",
                    title: "Nos Milkshakes",
                    items: [
                        { name: "Milkshake Fraise", price: "49 Dh" },
                        { name: "Milkshake Solero", price: "49 Dh" },
                        { name: "Milkshake Tout Choco", price: "49 Dh" }
                    ]
                },
                {
                    id: "smoothies",
                    title: "Nos Smoothies",
                    items: [
                        { name: "Smoothie Exotique", description: "Fruit de la passion, mangue-anananas", price: "49 Dh" },
                        { name: "Smoothie Fruits Rouges", description: "Fraise, myrtille, framboise", price: "49 Dh" }
                    ]
                },
                {
                    id: "mocktails",
                    title: "Nos Mocktails",
                    items: [
                        { name: "Mojito Piña Colada", price: "49 Dh" },
                        { name: "Mojito Nature", price: "40 Dh" },
                        { name: "Mojito Fruits Rouges", price: "49 Dh" }
                    ]
                },
                {
                    id: "jus-frais",
                    title: "Nos Jus Frais",
                    items: [
                        { name: "Orange", price: "39 Dh" },
                        { name: "Carotte Orange", price: "39 Dh" },
                        { name: "Citron", price: "39 Dh" },
                        { name: "Citron Gingembre", price: "49 Dh" }
                    ]
                },
                {
                    id: "eaux-sodas",
                    title: "Nos Eaux et Sodas",
                    items: [
                        { name: "Soda 33 cl", price: "25 Dh" },
                        { name: "Eau minérale 50 cl", price: "15 Dh" },
                        { name: "Oulmès", price: "15 Dh" },
                        { name: "Redbull", price: "45 Dh" },
                        { name: "Aqua Panna 33 cl", price: "30 Dh" },
                        { name: "Aqua Panna 50 cl", price: "50 Dh" },
                        { name: "San Pellegrino 33 cl", price: "30 Dh" },
                        { name: "San Pellegrino 50 cl", price: "50 Dh" }
                    ]
                }
            ]
        }
    ],

    // EN version (same structure, translated)
    en: [
        {
            id: "petits-dejeuners",
            title: "Breakfast & Brunch",
            categories: [
                {
                    id: "formules",
                    title: "Set Menus",
                    subtitle:
                        "Available Monday to Friday until 12:00, weekends & public holidays until 16:00",
                    items: [
                        {
                            name: "Benedict Formula",
                            description:
                                "Hot and cold drink of choice. Brioche bun with poached eggs and homemade hollandaise. Choice of salmon, pastrami, cold cuts or grilled vegetables. French toast or caramel dulce de leche pancake with homemade granola and whipped cream.",
                            price: "125 Dh"
                        },
                        {
                            name: "Egg Bun Formula",
                            description:
                                "Hot and cold drink of choice. Brioche bun with scrambled eggs and fresh cheese. Choice of salmon, pastrami, cold cuts or grilled vegetables. French toast or caramel dulce de leche pancake with homemade granola and whipped cream.",
                            price: "115 Dh"
                        },
                        {
                            name: "Continental Breakfast",
                            description:
                                "Hot and cold drink of choice. Omelet with a filling of your choice (grilled vegetables, cold cuts, cheese, mushrooms or spinach). Baker’s basket and condiments. Seasonal fruit salad with verbena.",
                            price: "95 Dh"
                        },
                        {
                            name: "Traditional Breakfast",
                            description:
                                "Hot and cold drink of choice. Khlii eggs (dried beef) or shakshouka with feta. Traditional basket (msemen, harcha, batbout) and whole wheat roll. Condiments: fresh cheese, honey, olive oil, marinated olives. Seasonal fruit salad with verbena.",
                            price: "105 Dh"
                        },
                        {
                            name: "Baker’s Formula",
                            description:
                                "Hot and cold drink of choice. Baker’s basket (mini pastries & rolls) with butter, jam and honey. Available Monday to Friday until 11:00.",
                            price: "55 Dh"
                        },
                        {
                            name: "Brunch Formula",
                            description:
                                "Hot and cold drink of choice. Baker’s basket and condiments. Toast: salmon avocado guacamole with poached egg OR grilled pastrami with cream cheese. Fruit salad, Sunshine Bowl or chia pudding. French toast or caramel dulce de leche pancake.",
                            price: "150 Dh"
                        }
                    ]
                },
                {
                    id: "oeufs",
                    title: "Fresh Eggs à la Carte",
                    subtitle: "Until 12:00",
                    items: [
                        { name: "2 Soft-Boiled Eggs", price: "35 Dh" },
                        { name: "3 Fried Eggs", price: "35 Dh" },
                        { name: "Plain Omelet", price: "40 Dh" },
                        { name: "Fresh Herb Omelet", price: "40 Dh" },
                        { name: "Cheese Omelet", price: "45 Dh" },
                        { name: "Turkey Ham Omelet", price: "45 Dh" },
                        { name: "Scrambled Eggs with Cream", price: "45 Dh" },
                        { name: "Khlii Eggs", price: "50 Dh" },
                        { name: "Mushroom Omelet", price: "50 Dh" },
                        { name: "Spinach Soufflé Omelet", price: "55 Dh" },
                        { name: "Salmon Omelet", price: "65 Dh" }
                    ]
                },
                {
                    id: "all-day",
                    title: "All Day Treat",
                    items: [
                        {
                            name: "Eggs Benedict (2)",
                            description:
                                "2 slices of Japanese milk bread. Beef pastrami on cream cheese OR gravlax salmon on sautéed spinach, hollandaise sauce.",
                            price: "95 Dh"
                        },
                        {
                            name: "Egg Bun (Pastrami or Salmon)",
                            description:
                                "Brioche bun. Poached eggs, cheddar, cream cheese, pastrami OR poached eggs, cream cheese, avocado, gravlax salmon.",
                            price: "85 Dh"
                        },
                        {
                            name: "Scandinavian Salmon Toast",
                            description:
                                "Sourdough bread, avocado guacamole, homemade gravlax salmon, poached egg, pickled onions.",
                            price: "95 Dh"
                        },
                        {
                            name: "Avocado Toast",
                            description: "Japanese milk bread, smashed avocado, hazelnuts, fried eggs.",
                            price: "75 Dh"
                        },
                        {
                            name: "Croque Madame",
                            description:
                                "Japanese milk bread, ham, béchamel, gratinated emmental cheese, fried eggs.",
                            price: "75 Dh"
                        }
                    ]
                }
            ]
        },

        {
            id: "bistronomique",
            title: "Bistronomic Menu",
            categories: [
                {
                    id: "salades-soupes",
                    title: "Salads & Soups",
                    items: [
                        { name: "Soup of the Day", description: "Vegetable velouté, onion soup or Thai soup.", price: "70 Dh" },
                        {
                            name: "Po’Kayser Bowl",
                            description:
                                "Quinoa, teriyaki chicken, marinated carrot, mango, cherry tomatoes, cucumber, sweet orange dressing.",
                            price: "100 Dh"
                        },
                        {
                            name: "Niçoise",
                            description:
                                "Basmati rice, mixed greens, green beans, potatoes, roasted pepper, cherry tomatoes, cucumber, tuna rillette, egg, balsamic vinaigrette, pickled onion, olives.",
                            price: "85 Dh"
                        },
                        {
                            name: "Avocado Fondant with Prawns",
                            description:
                                "Poached prawns, orange supreme, avocado cream, tomato and cucumber, orange vinaigrette.",
                            price: "105 Dh"
                        },
                        {
                            name: "Chicken Caesar Salad",
                            description:
                                "Romaine, marinated chicken, cherry tomatoes, anchovies, parmesan crumble, poached egg, homemade Caesar dressing, bread chips.",
                            price: "95 Dh"
                        },
                        {
                            name: "Stracciatella",
                            description:
                                "Burrata cream, grilled zucchini, olive oil, bread chips, pesto.",
                            price: "70 Dh"
                        },
                        {
                            name: "Prawn Caesar Salad",
                            description:
                                "Romaine, poached prawns, cherry tomatoes, anchovies, parmesan crumble, homemade Caesar dressing, bread chips.",
                            price: "120 Dh"
                        }
                    ]
                },
                {
                    id: "tartines",
                    title: "Toasts",
                    subtitle: "Served with green salad",
                    items: [
                        { name: "Bruschetta", description: "Sourdough bread, chicken, tomato-mozzarella fondue, pesto, black olives.", price: "85 Dh" },
                        { name: "Provençal Toast", description: "Sourdough bread, Provençal vegetables, feta, poached egg, arugula.", price: "85 Dh" },
                        { name: "Philly Cheesesteak Toast", description: "Sourdough bread, minced beef, caramelized onions, pickles, cheddar sauce, homemade fries.", price: "105 Dh" }
                    ]
                },
                {
                    id: "fougasses",
                    title: "Fougasses",
                    subtitle: "Served with green salad",
                    items: [
                        { name: "Mediterranean Fougasse", description: "Grilled vegetables, tomato sauce, pesto, stracciatella.", price: "75 Dh" },
                        { name: "Provençal Fougasse", description: "Vegetable ratatouille, tuna fillet, pesto and feta.", price: "85 Dh" },
                        { name: "Forestière Fougasse", description: "Chicken, sautéed mushrooms, béchamel sauce, cheese.", price: "80 Dh" }
                    ]
                },
                {
                    id: "sandwichs",
                    title: "Sandwiches",
                    subtitle: "Served with homemade fries and salad",
                    items: [
                        { name: "Pastrami Sandwich", description: "Ciabatta, homemade pastrami with house beef jus, wholegrain mustard, pickles & pickled onions, cheddar sauce.", price: "105 Dh" },
                        { name: "Chicken Club", description: "Cereal Big Mie bread, marinated chicken, hard-boiled egg, emmental, lettuce, tomato, tartar sauce.", price: "85 Dh" },
                        { name: "Tuna Club", description: "Big Mie bread, tuna rillette with celery, hard-boiled egg, cucumber and tomato.", price: "85 Dh" },
                        { name: "New Yorker", description: "Japanese milk bread, pastrami, béarnaise, tomato, arugula, coriander, pickles & pickled onion.", price: "105 Dh" },
                        { name: "Classic Burger", description: "Brioche bun, lettuce, beef patty, cheddar, onion, tomato, pickles, house sauce, crispy onion.", price: "95 Dh" },
                        { name: "Mexicano Burger", description: "Brioche bun, guacamole, Tex-Mex chicken, tomato, arugula, smoked paprika sauce.", price: "85 Dh" }
                    ]
                }
            ]
        },

        {
            id: "plats",
            title: "Main Dishes",
            categories: [
                {
                    id: "viandes",
                    title: "Meat",
                    subtitle:
                        "Served with homemade fries, salad and sauce of choice (mushroom, wholegrain mustard, béarnaise)",
                    items: [
                        { name: "Beef Fillet", description: "Grilled, served with salad and homemade fries.", price: "185 Dh" },
                        { name: "Roasted Chicken Leg", description: "Roasted chicken with rich jus, homemade mash and salad.", price: "105 Dh" },
                        { name: "Side add-on", description: "Mash / fries / sautéed vegetables / basmati rice.", price: "25 Dh" },
                        { name: "Sauce add-on", description: "Mushroom / béarnaise / wholegrain mustard sauce.", price: "25 Dh" }
                    ]
                },
                {
                    id: "poissons",
                    title: "Fish",
                    subtitle: "Served with basmati rice",
                    items: [
                        { name: "Salmon Steak", description: "Salmon steak, teriyaki sauce, sautéed vegetables.", price: "170 Dh" }
                    ]
                },
                {
                    id: "pates",
                    title: "Pasta",
                    items: [
                        { name: "Forestière Tagliatelle", description: "Sautéed chicken with creamy mushroom sauce.", price: "105 Dh" },
                        { name: "Tagliatelle with Two Salmons", description: "Fresh salmon & gravlax, spinach.", price: "110 Dh" },
                        { name: "Penne Crudaïola", description: "Tomato coulis, ratatouille, tuna rillette and feta, served with a fresh vegetable dressing.", price: "110 Dh" },
                        { name: "Spaghetti Bolognese", description: "Slow-cooked beef sauce with tomatoes and herbs.", price: "120 Dh" }
                    ]
                }
            ]
        },

        {
            id: "desserts",
            title: "Desserts",
            categories: [
                {
                    id: "desserts-list",
                    title: "Sweet Treats",
                    items: [
                        { name: "Chia Pudding", description: "Coconut milk, red berry coulis, fruit and homemade granola.", price: "55 Dh" },
                        { name: "Sunshine Bowl", description: "Yogurt bowl with honey, fruit and homemade granola.", price: "60 Dh" },
                        { name: "Seasonal Fruit Salad (verbena)", price: "45 Dh" },
                        { name: "French Toast", description: "Toasted brioche, red berry coulis or chocolate or caramel, dulce de leche and vanilla ice cream.", price: "65 Dh" },
                        { name: "Pancake", description: "Pancake with fruit coulis or chocolate or caramel, whipped cream, dulce de leche and vanilla ice cream.", price: "65 Dh" },
                        { name: "Sebastian (choice of sauces)", description: "Caramel dulce de leche, chocolate or pistachio.", price: "55 Dh" },
                        { name: "Triple Chocolate Cookie", description: "Skillet-served with vanilla ice cream.", price: "65 Dh" },
                        { name: "Kunafa Crêpes", description: "Chocolate sauce, pistachio kunafa, vanilla ice cream.", price: "65 Dh" },
                        { name: "Chocolate Fondant", description: "Served with vanilla ice cream.", price: "55 Dh" },
                        { name: "Crêpes (orange / chocolate / caramel dulce de leche)", description: "With vanilla ice cream.", price: "55 Dh" }
                    ]
                }
            ]
        },

        {
            id: "boissons",
            title: "Drinks",
            categories: [
                {
                    id: "cafes",
                    title: "Coffee",
                    items: [
                        { name: "Espresso", price: "27 Dh" },
                        { name: "Double Espresso", price: "50 Dh" },
                        { name: "Hazelnut Coffee", price: "27 Dh" },
                        { name: "Americano", price: "27 Dh" },
                        { name: "Long Coffee", price: "27 Dh" },
                        { name: "Cortado / Noss Noss", price: "29 Dh" },
                        { name: "Flat White", price: "33 Dh" },
                        { name: "Large Café Crème", price: "33 Dh" },
                        { name: "Cappuccino", price: "37 Dh" },
                        { name: "Espresso Macchiato", price: "29 Dh" },
                        { name: "Viennese Mocha", price: "48 Dh" },
                        { name: "Traditional Mocha", price: "42 Dh" }
                    ]
                },
                {
                    id: "chocolats",
                    title: "Hot Chocolates",
                    items: [
                        { name: "Old-Fashioned Hot Chocolate", price: "45 Dh" },
                        { name: "Hot Chocolate", price: "39 Dh" },
                        { name: "Viennese Hot Chocolate", price: "50 Dh" }
                    ]
                },
                {
                    id: "thes",
                    title: "Tea & Infusions",
                    items: [
                        { name: "Moroccan Tea", price: "27 Dh" },
                        { name: "Tea & Herbal Infusions", price: "45 Dh" }
                    ]
                },
                {
                    id: "lattes",
                    title: "Lattes",
                    items: [
                        { name: "Latte Macchiato", description: "Caramel, hazelnut or vanilla", price: "45 Dh" },
                        { name: "Kayser Latte", description: "Madeleine or cookies or gingerbread", price: "55 Dh" },
                        { name: "Chai Latte", price: "45 Dh" },
                        { name: "Golden Latte", price: "55 Dh" },
                        { name: "Matcha Latte", price: "55 Dh" },
                        { name: "Plant-based milk (add-on)", price: "10 Dh" },
                        { name: "Hot Milk", price: "15 Dh" },
                        { name: "Whipped Cream", price: "12 Dh" }
                    ]
                },
                {
                    id: "cafes-glaces",
                    title: "Iced Coffee",
                    items: [
                        { name: "Frappé", description: "Vanilla, coffee", price: "49 Dh" },
                        { name: "Affogato", description: "Vanilla ice cream scoop", price: "49 Dh" }
                    ]
                },
                {
                    id: "thes-glaces",
                    title: "Iced Tea",
                    items: [
                        { name: "Peach", description: "Green tea, peach syrup", price: "39 Dh" },
                        { name: "Booster", description: "Green tea, ginger, lemon, hibiscus", price: "39 Dh" }
                    ]
                },
                {
                    id: "milkshakes",
                    title: "Milkshakes",
                    items: [
                        { name: "Strawberry Milkshake", price: "49 Dh" },
                        { name: "Solero Milkshake", price: "49 Dh" },
                        { name: "All Chocolate Milkshake", price: "49 Dh" }
                    ]
                },
                {
                    id: "smoothies",
                    title: "Smoothies",
                    items: [
                        { name: "Exotic Smoothie", description: "Passion fruit, mango, pineapple", price: "49 Dh" },
                        { name: "Red Berries Smoothie", description: "Strawberry, blueberry, raspberry", price: "49 Dh" }
                    ]
                },
                {
                    id: "mocktails",
                    title: "Mocktails",
                    items: [
                        { name: "Mojito Piña Colada", price: "49 Dh" },
                        { name: "Classic Mojito", price: "40 Dh" },
                        { name: "Red Berries Mojito", price: "49 Dh" }
                    ]
                },
                {
                    id: "jus-frais",
                    title: "Fresh Juices",
                    items: [
                        { name: "Orange", price: "39 Dh" },
                        { name: "Carrot-Orange", price: "39 Dh" },
                        { name: "Lemon", price: "39 Dh" },
                        { name: "Lemon & Ginger", price: "49 Dh" }
                    ]
                },
                {
                    id: "eaux-sodas",
                    title: "Water & Sodas",
                    items: [
                        { name: "Soda 33 cl", price: "25 Dh" },
                        { name: "Mineral Water 50 cl", price: "15 Dh" },
                        { name: "Oulmes", price: "15 Dh" },
                        { name: "Red Bull", price: "45 Dh" },
                        { name: "Aqua Panna 33 cl", price: "30 Dh" },
                        { name: "Aqua Panna 50 cl", price: "50 Dh" },
                        { name: "San Pellegrino 33 cl", price: "30 Dh" },
                        { name: "San Pellegrino 50 cl", price: "50 Dh" }
                    ]
                }
            ]
        }
    ]
};
