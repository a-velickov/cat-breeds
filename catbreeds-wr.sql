--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

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
-- Name: breed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breed (
    breed_id integer NOT NULL,
    breed_name character varying(25) NOT NULL,
    weight_kg character varying(10) NOT NULL,
    avg_lifespan character varying(10) NOT NULL,
    description text NOT NULL,
    origin character(2) NOT NULL,
    ct_id character(2) NOT NULL,
    ear_s_id character(2) NOT NULL,
    eye_s_id character(2) NOT NULL
);


ALTER TABLE public.breed OWNER TO postgres;

--
-- Name: breed_breed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breed_breed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breed_breed_id_seq OWNER TO postgres;

--
-- Name: breed_breed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breed_breed_id_seq OWNED BY public.breed.breed_id;


--
-- Name: breed_coat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breed_coat (
    breed_id integer NOT NULL,
    cp_id character(3) NOT NULL,
    cc_id integer NOT NULL
);


ALTER TABLE public.breed_coat OWNER TO postgres;

--
-- Name: breed_coat_breed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breed_coat_breed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breed_coat_breed_id_seq OWNER TO postgres;

--
-- Name: breed_coat_breed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breed_coat_breed_id_seq OWNED BY public.breed_coat.breed_id;


--
-- Name: breed_coat_cc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breed_coat_cc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breed_coat_cc_id_seq OWNER TO postgres;

--
-- Name: breed_coat_cc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breed_coat_cc_id_seq OWNED BY public.breed_coat.cc_id;


--
-- Name: breed_eye; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breed_eye (
    breed_id integer NOT NULL,
    ec_id integer NOT NULL
);


ALTER TABLE public.breed_eye OWNER TO postgres;

--
-- Name: breed_eye_breed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breed_eye_breed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breed_eye_breed_id_seq OWNER TO postgres;

--
-- Name: breed_eye_breed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breed_eye_breed_id_seq OWNED BY public.breed_eye.breed_id;


--
-- Name: breed_eye_ec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.breed_eye_ec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.breed_eye_ec_id_seq OWNER TO postgres;

--
-- Name: breed_eye_ec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.breed_eye_ec_id_seq OWNED BY public.breed_eye.ec_id;


--
-- Name: coat_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coat_color (
    cc_id integer NOT NULL,
    color_name character varying(25) NOT NULL
);


ALTER TABLE public.coat_color OWNER TO postgres;

--
-- Name: coat_color_cc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coat_color_cc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coat_color_cc_id_seq OWNER TO postgres;

--
-- Name: coat_color_cc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coat_color_cc_id_seq OWNED BY public.coat_color.cc_id;


--
-- Name: coat_pattern; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coat_pattern (
    cp_id character(3) NOT NULL,
    cp_name character varying(20) NOT NULL
);


ALTER TABLE public.coat_pattern OWNER TO postgres;

--
-- Name: coat_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coat_type (
    ct_id character(2) NOT NULL,
    ct_name character varying(20) NOT NULL
);


ALTER TABLE public.coat_type OWNER TO postgres;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    country_code character(2) NOT NULL,
    country_name character varying(40) NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Name: ear_shape; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ear_shape (
    ear_s_id character(2) NOT NULL,
    shape character varying(20) NOT NULL
);


ALTER TABLE public.ear_shape OWNER TO postgres;

--
-- Name: eye_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eye_color (
    ec_id integer NOT NULL,
    ecolor character varying(20) NOT NULL
);


ALTER TABLE public.eye_color OWNER TO postgres;

--
-- Name: eye_color_ec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eye_color_ec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eye_color_ec_id_seq OWNER TO postgres;

--
-- Name: eye_color_ec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eye_color_ec_id_seq OWNED BY public.eye_color.ec_id;


--
-- Name: eye_shape; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eye_shape (
    eye_s_id character(2) NOT NULL,
    shape character varying(20) NOT NULL
);


ALTER TABLE public.eye_shape OWNER TO postgres;

--
-- Name: breed breed_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed ALTER COLUMN breed_id SET DEFAULT nextval('public.breed_breed_id_seq'::regclass);


--
-- Name: breed_coat breed_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed_coat ALTER COLUMN breed_id SET DEFAULT nextval('public.breed_coat_breed_id_seq'::regclass);


--
-- Name: breed_coat cc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed_coat ALTER COLUMN cc_id SET DEFAULT nextval('public.breed_coat_cc_id_seq'::regclass);


--
-- Name: breed_eye breed_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed_eye ALTER COLUMN breed_id SET DEFAULT nextval('public.breed_eye_breed_id_seq'::regclass);


--
-- Name: breed_eye ec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed_eye ALTER COLUMN ec_id SET DEFAULT nextval('public.breed_eye_ec_id_seq'::regclass);


--
-- Name: coat_color cc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coat_color ALTER COLUMN cc_id SET DEFAULT nextval('public.coat_color_cc_id_seq'::regclass);


--
-- Name: eye_color ec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eye_color ALTER COLUMN ec_id SET DEFAULT nextval('public.eye_color_ec_id_seq'::regclass);


--
-- Data for Name: breed; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (2, 'Russian Blue', '3-5.5', '15-20', 'Cat of long, lithe body and elegant look. Shy, gentle, intelligent. Reserved with strangers.', 'RU', 'SH', 'PT', 'SS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (3, 'Ocicat', '2.5-6.5', '12-14', 'Large spotted cat. Very athletic, active, sociable and playful.', 'US', 'SH', 'PT', 'AS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (4, 'Turkish Angora', '2.5-5', '9-14', 'Medium sized moderately active cat with semi-long silky fur. Playful and social.', 'TR', 'SL', 'PT', 'AS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (5, 'Siamese', '2.5-5.5', '15-20', 'Medium sized cat of strong lithe body. Affectionate, outgoing and friendly. Highly intelligent.', 'TH', 'SH', 'PT', 'AS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (6, 'Bengal', '5.5-10', '9-15', 'Medium to large size. Strong muscular body with a slightly smaller head. Active and energetic.', 'US', 'SH', 'RT', 'RS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (7, 'Munchkin', '2.5-4', '12-15', 'Short-legged cat. Energetic, love to play and explore. Typically get along with other pets.', 'US', 'SH', 'PT', 'AS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (8, 'Nebelung', '3-6', '11-18', 'Medium sized well-muscled cat with large ears. Relatively subdued and easy-going personality. Gentle, calm, quiet.', 'US', 'SL', 'PT', 'RS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (9, 'Persian', '3.5-6.5', '10-15', 'Cat of thick, long fur coat. Require daily brushing. They are calm and affectionate.', 'IR', 'LH', 'RT', 'RS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (10, 'Selkirk Rex', '3-5', '15-20', 'Cat of curly coat, most prominent around neck and tail. Curious, friendly and upbeat personality.', 'US', 'CH', 'PT', 'RS');
INSERT INTO public.breed (breed_id, breed_name, weight_kg, avg_lifespan, description, origin, ct_id, ear_s_id, eye_s_id) VALUES (1, 'Bombay', '2.5-5', '9-15', 'Medium sized cat with substantial bone structure. Socialable, outgoing, playful, friendly. They get along well with children and other pets.', 'US', 'SH', 'RT', 'RS');


--
-- Data for Name: breed_coat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (1, 'PSO', 7);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (2, 'PSO', 6);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (3, 'PTB', 1);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (3, 'PTB', 2);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (3, 'PTB', 3);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (3, 'PTB', 5);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (3, 'PTB', 6);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (4, 'ACP', 9);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (5, 'PPO', 9);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 1);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 2);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 3);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 5);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 6);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (6, 'PTB', 7);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (7, 'ACP', 9);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (8, 'PSO', 6);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (9, 'ACP', 9);
INSERT INTO public.breed_coat (breed_id, cp_id, cc_id) VALUES (10, 'ACP', 9);


--
-- Data for Name: breed_eye; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (1, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (1, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (2, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (3, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (3, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (3, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (3, 5);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 2);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 5);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (4, 7);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (6, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (6, 2);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (6, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (6, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (6, 5);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (7, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (7, 2);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (7, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (7, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (7, 5);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (8, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (9, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (9, 2);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (9, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (9, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (9, 5);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (10, 1);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (10, 2);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (10, 3);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (10, 4);
INSERT INTO public.breed_eye (breed_id, ec_id) VALUES (10, 5);


--
-- Data for Name: coat_color; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coat_color (cc_id, color_name) VALUES (1, 'lilac');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (2, 'fawn');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (3, 'cinammon');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (4, 'red');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (5, 'cream');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (6, 'blue');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (7, 'black');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (8, 'white');
INSERT INTO public.coat_color (cc_id, color_name) VALUES (9, 'all');


--
-- Data for Name: coat_pattern; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PSO', 'Solid');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PPO', 'Pointed');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PTB', 'Tabby');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PTS', 'Tortoiseshell');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PSH', 'Shaded');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PSM', 'Smokey');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PTP', 'Tipped');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('PWS', 'White-spotting');
INSERT INTO public.coat_pattern (cp_id, cp_name) VALUES ('ACP', 'all');


--
-- Data for Name: coat_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coat_type (ct_id, ct_name) VALUES ('SL', 'Semi-longhair');
INSERT INTO public.coat_type (ct_id, ct_name) VALUES ('SH', 'Shorthair');
INSERT INTO public.coat_type (ct_id, ct_name) VALUES ('LH', 'Longhair');
INSERT INTO public.coat_type (ct_id, ct_name) VALUES ('CH', 'Curly');
INSERT INTO public.coat_type (ct_id, ct_name) VALUES ('NH', 'Hairless');


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.country (country_code, country_name) VALUES ('US', 'United States of America');
INSERT INTO public.country (country_code, country_name) VALUES ('RU', 'Russia');
INSERT INTO public.country (country_code, country_name) VALUES ('CA', 'Canada');
INSERT INTO public.country (country_code, country_name) VALUES ('NO', 'Norway');
INSERT INTO public.country (country_code, country_name) VALUES ('TR', 'Turkey');
INSERT INTO public.country (country_code, country_name) VALUES ('AU', 'Australia');
INSERT INTO public.country (country_code, country_name) VALUES ('TH', 'Thailand');
INSERT INTO public.country (country_code, country_name) VALUES ('IR', 'Iran');


--
-- Data for Name: ear_shape; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ear_shape (ear_s_id, shape) VALUES ('RT', 'rounded-tip');
INSERT INTO public.ear_shape (ear_s_id, shape) VALUES ('PT', 'pointed-tip');
INSERT INTO public.ear_shape (ear_s_id, shape) VALUES ('CS', 'curled');
INSERT INTO public.ear_shape (ear_s_id, shape) VALUES ('FS', 'folded');


--
-- Data for Name: eye_color; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.eye_color (ec_id, ecolor) VALUES (1, 'green');
INSERT INTO public.eye_color (ec_id, ecolor) VALUES (2, 'blue');
INSERT INTO public.eye_color (ec_id, ecolor) VALUES (5, 'hazel');
INSERT INTO public.eye_color (ec_id, ecolor) VALUES (7, 'odd-color');
INSERT INTO public.eye_color (ec_id, ecolor) VALUES (3, 'yellow/amber/gold');
INSERT INTO public.eye_color (ec_id, ecolor) VALUES (4, 'orange/copper');


--
-- Data for Name: eye_shape; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.eye_shape (eye_s_id, shape) VALUES ('RS', 'round');
INSERT INTO public.eye_shape (eye_s_id, shape) VALUES ('AS', 'almond-shaped');
INSERT INTO public.eye_shape (eye_s_id, shape) VALUES ('SS', 'slanted');


--
-- Name: breed_breed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_breed_id_seq', 10, true);


--
-- Name: breed_coat_breed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_coat_breed_id_seq', 1, false);


--
-- Name: breed_coat_cc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_coat_cc_id_seq', 1, false);


--
-- Name: breed_eye_breed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_eye_breed_id_seq', 1, false);


--
-- Name: breed_eye_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_eye_ec_id_seq', 1, false);


--
-- Name: coat_color_cc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coat_color_cc_id_seq', 10, true);


--
-- Name: eye_color_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eye_color_ec_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

