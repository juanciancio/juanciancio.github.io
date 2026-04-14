import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { projects } from '../data/projects';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { ImageCarousel } from '../components/ui/ImageCarousel';
import { PhoneMockup } from '../components/ui/PhoneMockup';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, locale } = useTranslation();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-text-secondary">Proyecto no encontrado</p>
          <Button onClick={() => navigate('/')}>Volver</Button>
        </div>
      </div>
    );
  }

  const hasVideo = !!project.video;
  const hasImages = project.images.length > 0;
  const isMobile = project.displayType === 'mobile';

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-base/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            {locale === 'es' ? 'Volver a proyectos' : 'Back to projects'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Title Section */}
          <div className="space-y-4">
            <span className="text-xs font-medium text-accent uppercase tracking-wide">
              {project.category === 'ai' ? 'AI & Automation' : locale === 'es' ? 'Aplicacion' : 'Application'}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              {project.title[locale]}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              {project.longDescription[locale]}
            </p>
          </div>

          {/* Media: Video */}
          {hasVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl overflow-hidden border border-border bg-surface"
            >
              <video
                src={project.video!}
                controls
                playsInline
                className="w-full"
                poster={project.image || undefined}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}

          {/* Media: Image Carousel */}
          {!hasVideo && hasImages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {isMobile ? (
                <PhoneMockup className="py-4">
                  <ImageCarousel
                    images={project.images}
                    autoPlay
                    interval={3000}
                    showControls
                    alt={project.title[locale]}
                  />
                </PhoneMockup>
              ) : (
                <div className="rounded-xl overflow-hidden border border-border bg-surface group">
                  <div className="aspect-[16/9] relative">
                    <ImageCarousel
                      images={project.images}
                      showControls
                      alt={project.title[locale]}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Stack & Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-4">
                {t.projects.stack}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-4">
                {t.projects.features}
              </h2>
              <ul className="space-y-3">
                {project.features[locale].map((feature, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-3">
                    <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Links */}
          {(project.links.demo || project.links.repo) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex gap-4 pt-4"
            >
              {project.links.demo && (
                <Button href={project.links.demo}>
                  Demo <ArrowUpRight size={14} />
                </Button>
              )}
              {project.links.repo && (
                <Button variant="outline" href={project.links.repo}>
                  Repositorio <ArrowUpRight size={14} />
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
