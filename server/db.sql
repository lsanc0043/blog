--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS blog;

--
-- Name: blog; Type: DATABASE; Schema: -; Owner: postgres 
--

CREATE DATABASE blog WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';

ALTER DATABASE blog OWNER TO postgres;

\connect blog

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: faves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faves (
    id integer NOT NULL,
    post_id integer,
    user_id integer
);


ALTER TABLE public.faves OWNER TO postgres;

--
-- Name: faves_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faves_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faves_id_seq OWNER TO postgres;

--
-- Name: faves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faves_id_seq OWNED BY public.faves.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description character varying(200),
    content text NOT NULL,
    image character varying,
    last_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    likes integer DEFAULT 0,
    user_id integer
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    pfp text DEFAULT 'https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg'::text,
    firstname character varying(50),
    lastname character varying(50),
    description text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: faves id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faves ALTER COLUMN id SET DEFAULT nextval('public.faves_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: faves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faves (id, post_id, user_id) FROM stdin;
22	68	26
23	67	26
25	67	27
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, description, content, image, last_updated, likes, user_id) FROM stdin;
68	Omniscient Reader's Viewpoint	An office worker's favorite webnovel becomes reality	A novel called Three Ways to Survive in a Ruined World (written by the anonymous author tls123) has been written and published over the course of a decade, and Kim Dokja is the sole reader who has followed it to its ending. When the real world is plunged into the premise of Ways of Survival, Kim Dokja's unique knowledge of the novel becomes vital to his survival. Kim Dokja allies with Yoo Joonghyuk, the protagonist of Ways of Survival, in order to change the novel's original plot and more quickly approach the end of the story. As Kim Dokja and his party members progress through the scenarios, they face increasingly difficult threats and life-or-death challenges, struggling to stay alive and work together as they aim to destroy the <Star Stream> that demands their suffering.	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1595668190l/54668130._SX318_.jpg	2022-10-14 00:30:10.578953-07	6	25
70	Dragon Ball Z	Boy tries to find 7 orbs to summon dragon	Dragon Ball (Japanese: πâëπâ⌐πé┤πâ│πâ£πâ╝πâ½, Hepburn: Doragon B┼ìru) is a Japanese media franchise created by Akira Toriyama in 1984. The initial manga, written and illustrated by Toriyama, was serialized in Weekly Sh┼ìnen Jump from 1984 to 1995, with the 519 individual chapters collected into 42 tank┼ìbon volumes by its publisher Shueisha. Dragon Ball was originally inspired by the classical 16th-century Chinese novel Journey to the West, combined with elements of Hong Kong martial arts films. The series follows the adventures of protagonist Son Goku from his childhood through adulthood as he trains in martial arts. He spends his childhood far from civilization until he meets a teen girl named Bulma, who encourages him to join her quest in exploring the world in search of the seven orbs known as the Dragon Balls, which summon a wish-granting dragon when gathered. Along his journey, Goku makes several other friends, becomes a family man, discovers his alien heritage, and battles a wide variety of villains, many of whom also seek the Dragon Balls.	https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Weekly_Sh%C5%8Dnen_Jump_No._51_%28Dec._1984%29_is_the_first_appearance_of_Goku._Cover_art_by_Akira_Toriyama.jpg/255px-Weekly_Sh%C5%8Dnen_Jump_No._51_%28Dec._1984%29_is_the_first_appearance_of_Goku._Cover_art_by_Akira_Toriyama.jpg	2022-10-14 08:11:47.064101-07	0	27
67	One Piece	A story about a rubber boy who wants to be Pirate King	Setting\n\nThe world of One Piece is populated by humans and many other races, such as dwarves, fish-men, and giants. It is covered by two vast oceans, which are divided by a massive mountain range called the Red Line; The Grand Line, a sea that runs perpendicular to the Red Line, further divides them into four seas: North Blue, East Blue, West Blue, and South Blue. Surrounding the Grand Line are two regions called Calm Belts, similar to horse latitudes, which experience almost no wind or ocean currents and are the breeding ground for huge sea creatures called sea kings. Because of this, the calm belts are very effective barriers for those trying to enter the Grand Line. However, navy ships, members of an intergovernmental organization known as the World Government, are able to use a sea-prism stone to mask their presence from the sea kings and can simply pass through the calm belts. All other ships are forced to take a more dangerous route, going through a mountain at the first intersection of the Grand Line and the Red Line, a canal system known as Reverse Mountain. Sea water from each of the four seas runs up that mountain and merges at the top to flow down a fifth canal and into the first half of the Grand Line, called Paradise because how it compared to the second half. The second half of the Grand Line, beyond the second intersection with the Red Line, is known as the New World.\n\nPlot\n\nThe series focuses on Monkey D. Luffy, a young man made of rubber, who, inspired by his childhood idol, the powerful pirate Red-Haired Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates. In an effort to organize his own crew, the Straw Hat Pirates, Luffy rescues and befriends a pirate hunter and swordsman named Roronoa Zoro, and they head off in search of the titular treasure. They are joined in their journey by Nami, a money-obsessed thief and navigator; Usopp, a sniper and compulsive liar; and Sanji, a perverted but chivalrous cook. They acquire a ship, the Going Merry, and engage in confrontations with notorious pirates of the East Blue. As Luffy and his crew set out on their adventures, others join the crew later in the series, including Tony Tony Chopper, an anthropomorphized reindeer doctor; Nico Robin, an archaeologist and former Baroque Works assassin; Franky, a cyborg shipwright; Brook, a skeleton musician and swordsman; and Jimbei, a fish-man helmsman and former member of the Seven Warlords of the Sea. Once the Going Merry is damaged beyond repair, Franky builds the Straw Hat Pirates a new ship, the Thousand Sunny. Together, they encounter other pirates, bounty hunters, criminal organizations, revolutionaries, secret agents, and soldiers of the corrupt World Government, and various other friends and foes, as they sail the seas in pursuit of their dreams.	https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg	2022-10-14 00:24:59.695081-07	14	24
69	Detective Conan (AKA Case Closed)	A high school detective shrinks into a first grader	Jimmy Kudo (Japanese name: Shinichi Kudo) is a high school detective who sometimes works with the police to solve cases. During an investigation, he is ambushed and incapacitated by a member of a crime syndicate known as the Black Organization. In an attempt to murder the young detective, they force-fed him a dangerous experimental drug. However, instead of killing him, it turns him into a kid. Adopting the pseudonym Conan Edogawa and keeping his true identity a secret, Kudo lives with his childhood friend Rachel Moore (Ran Mori) and her father Richard (Kogoro Mori), who is a private detective. \n\nThroughout the series, he tags along on Richard's cases. Nonetheless, after Kudo solves one, he will use Dr. Agasa's hidden tranquilizer to sedate Richard and then uses a voice changer to simulate his voice to reveal the solution. He also enrolls in Teitan Elementary School where he makes friends with a group of classmates who form their own Junior Detective Club (Detective Boys). While he continues to dig deeper into the Black Organization, he frequently interacts with other characters, including his neighbor, Dr. Agasa, Ran's friend Serena Sebastian (Sonoko Suzuki), a fellow teenage detective Harley Hartwell (Heiji Hattori), assorted police detectives from different regions, and a phantom thief called the Kaito Kid.\n\nKudo later encounters an elementary school transfer student, Anita Hailey (Ai Haibara), who reveals herself to be a former member of the Black Organization under the code name "Sherry" and the creator of the experimental drug that shrunk him. She too had ingested it to evade the pursuit of the organization. She soon joins the Junior Detectives. During a rare encounter with the Black Organization, Conan helps the FBI plant a CIA agent, Kir, inside the Black Organization as a spy.	https://upload.wikimedia.org/wikipedia/en/3/3f/Case_Closed_Volume_36.png	2022-10-14 00:32:30.006134-07	3	26
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, pfp, firstname, lastname, description) FROM stdin;
24	londa	TestPass1	https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg	postgres	Sanchez	\N
25	rindah	TestPass2	https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg	postgres	Sanchez	\N
26	lsanc0043	TestPass3	https://miro.medium.com/max/1400/1*b2ZpVczibdIDlUbuN6S2ZA.png	postgres	Sanchez	My name is postgres Sanchez. I was born and raised in Los Angeles, CA. My first language is Cantonese, but over the years I have also learnedMandarin, Korean, and English (yes, this is still a work in progress). I am a first-generation Chinese American born and raised in Los Angeles, California. Growing up, I was highly motivated to excel in my studies in order to respect and repay my parents for their sacrifices. In my undergraduate studies, I majored in computational biology with a focus in neurosystems and minored in Asian languages. I am always driven to improve myself, meet the expectations of myself, my family, and my peers, and most of all, make my parents proud.
27	bosstech	BossTech1	https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg	Angel	Sanchez	Angel is super cool!
\.


--
-- Name: faves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faves_id_seq', 25, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 70, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 27, true);


--
-- Name: faves faves_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faves
    ADD CONSTRAINT faves_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_title_key UNIQUE (title);


--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_key UNIQUE (password);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

