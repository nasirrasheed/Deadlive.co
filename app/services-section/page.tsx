// app/services-section/page.tsx
import ServicesSection from '@/components/ServicesSection';
import { getServices } from '@/lib/getServices';

export default async function ServicesSectionPage() {
  const services = await getServices();

  if (!services.length) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load Services
      </div>
    );
  }

  return <ServicesSection services={services} showAllButton={false} />;
}
