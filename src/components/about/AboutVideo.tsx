interface AboutVideoProps {
  videoId: string;
}

function AboutVideo({ videoId }: AboutVideoProps) {
  return (
    <section className="flex justify-center py-8 pb-18 select-none">
      <iframe
        className="w-[90%] max-w-[700px] aspect-video h-auto rounded-xl border-none shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Apresentação em vídeo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
}

export default AboutVideo;
