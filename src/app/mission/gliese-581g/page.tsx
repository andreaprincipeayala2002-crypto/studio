'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const preguntas = [
  {
    texto: "¿Qué compuesto sugiere actividad biológica?",
    opciones: ["Metano", "Helio", "Argón"],
    correcta: 0
  },
  {
    texto: "¿Qué temperatura tiene Kepler-186f?",
    opciones: ["-40°C", "20°C", "100°C"],
    correcta: 0
  },
  {
    texto: "¿Qué gas está presente en trazas?",
    opciones: ["H₂O", "O₂", "N₂"],
    correcta: 0
  }
];

export default function MisionGliese581g() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [contenidoPanel, setContenidoPanel] = useState<React.ReactNode>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    mostrarPregunta();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [preguntaActual]);

  const mostrarPregunta = () => {
    if (preguntaActual >= preguntas.length) {
      setContenidoPanel(
        <>
          <h1 className="text-2xl font-bold">✅ ¡Misión completada!</h1>
          <p>Has analizado la atmósfera de Kepler-186f y detectado biofirmas compatibles con vida microbiana.</p>
        </>
      );
      return;
    }

    const p = preguntas[preguntaActual];
    setContenidoPanel(
      <>
        <h2 className="text-xl font-bold">{`Fase ${preguntaActual + 1}`}</h2>
        <p>{p.texto}</p>
        {p.opciones.map((opcion, i) => (
          <div key={i} className="option" onClick={() => responder(i)}>
            {opcion}
          </div>
        ))}
      </>
    );
  };

  const responder = (seleccion: number) => {
    const p = preguntas[preguntaActual];

    if (seleccion === p.correcta) {
      setContenidoPanel(<p className="text-green-400">✅ ¡Correcto!</p>);
      timeoutRef.current = setTimeout(() => {
        setPreguntaActual(prev => prev + 1);
      }, 1500);
    } else {
        const p = preguntas[preguntaActual];
        setContenidoPanel(
        <>
            <h2 className="text-xl font-bold">{`Fase ${preguntaActual + 1}`}</h2>
            <p>{p.texto}</p>
            {p.opciones.map((opcion, i) => (
            <div key={i} className="option" onClick={() => responder(i)}>
                {opcion}
            </div>
            ))}
            <p className="text-red-400">❌ Incorrecto. Intenta de nuevo.</p>
        </>
        );
    }
  };
  
  return (
    <div id="mission-gliese-581g">
        <div className="panel" id="preguntas">
            {contenidoPanel}
        </div>
        <Link href="/" className="back-link">
            <ArrowLeft className="inline-block h-4 w-4 mr-2" />
            Volver al mapa galáctico
        </Link>
    </div>
  );
}
